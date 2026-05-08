import dotenv from 'dotenv'
dotenv.config()
import cors from "cors"
import express, { Application } from "express"
import { ConnectMongoDB } from './frameWork/database/dbConnection/dbConnection'
import { UserRoutes } from "./frameWork/routes/client/clientRoutes"
import { FreelancerRoutes } from './frameWork/routes/freelancers/freelancerRoutes'
import { AdminRoutes } from './frameWork/routes/admin/adminRoutes'
import { ChatRoute } from './frameWork/routes/chat/chatRoute'
import helmet from 'helmet'

//socket.io
import { createServer } from 'http'
import { Server as SocketIoServer } from 'socket.io'

//chat
import { MessageRepository } from './adapters/repository/client/messageRepository'
import { ChatRepository } from './adapters/repository/chat/chatRepository'
import { ChatUsecase } from './useCase/chat/chatUsecase'


export class App {
    private _app: Application
    private _port: string | number
    private _database: ConnectMongoDB
    public httpServer: ReturnType<typeof createServer>
    public io: SocketIoServer
    constructor() {
        this._app = express()
        this._app.use(helmet())
        this._port = process.env.PORT || 3560
        this.httpServer = createServer(this._app)
        const origin = process.env.FRONTEND_URL;
        
        this.io = new SocketIoServer(this.httpServer, {
            cors: {
                origin: origin,
                credentials: true,
                methods: ["GET", "POST"]
            }
        })

        this._database = new ConnectMongoDB()
        this._database.connectDB()
        this._app.use(
            cors({
                origin: origin,
                credentials: true,
                methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
            })
        )
        this._app.use((req, res, next) => {
            if (req.originalUrl.startsWith('/client/stripe/webhook')) {
                next();
            } else {
                express.json()(req, res, next);
            }
        });
        this._app.use(express.urlencoded({ extended: true }))
        this._setClientRoutes()
        this._setFreelancerRoutes()
        this._setAdminRoutes()
        this._setChatRoutes()
        this._setSocketConnection()
        this.listen()
    }

    private _setSocketConnection() {
        const messageRepository = new MessageRepository()
        const chatRepository = new ChatRepository()
        const chatUsecase = new ChatUsecase(messageRepository, chatRepository)

        this.io.on("connection", (socket) => {
            console.log("user connected", socket.id)

            //room joined
            socket.on("join_chat", (roomId: string) => {
                socket.join(roomId)
                console.log(`Socket ${socket.id} joined room: ${roomId}`);
            })

            //message received from frontend and saved in db
            socket.on("send_message", async (messageData) => {
                try {
                    console.log("messageData from socket received", messageData)
                    const savedMessage = await chatUsecase.saveMessage({ input: messageData })

                    // Broadcast to everyone in the room (including sender to get the DB ID and timestamp)
                    this.io.to(messageData.roomId).emit("receive_message", savedMessage.message)

                } catch (error) {
                    console.log("error in send_message", error)
                }
            })

            // Mark messages as read
            socket.on("mark_as_read", async ({ roomId, userId }) => {
                try {
                    console.log(`Marking messages as read in room ${roomId} for user ${userId}`);
                    await chatUsecase.markMessagesAsRead(roomId, userId);
                    // Notify everyone else in the room that messages were read
                    socket.to(roomId).emit("messages_read", { roomId, userId });
                } catch (error) {
                    console.log("error in mark_as_read", error);
                }
            })

            socket.on("disconnect", () => {
                console.log("user disconnected", socket.id)
            })
        })
    }

    listen() {
        this.httpServer.listen(this._port, () => {
            console.log(`server runned ${this._port}`)
        })
    }

    private _setClientRoutes() {
        this._app.use('/client/', new UserRoutes().UserRoutes)
    }

    private _setFreelancerRoutes() {
        this._app.use("/freelancer", new FreelancerRoutes().FreelancerRoutes)
    }


    private _setChatRoutes() {
        this._app.use('/chat', new ChatRoute().chatRoutes)
    }
    private _setAdminRoutes() {
        this._app.use("/admin", new AdminRoutes().AdminRoutes)
    }
}

const _app = new App()
