import dotenv from 'dotenv'
dotenv.config()
import cors from "cors"
import express, { Application } from "express"
import { ConnectMongoDB } from './frameWork/database/dbConnection/dbConnection'
import { UserRoutes } from "./frameWork/routes/client/clientRoutes"
import { FreelancerRoutes } from './frameWork/routes/freelancers/freelancerRoutes'
import { AdminRoutes } from './frameWork/routes/admin/adminRoutes'
import { ChatRoute } from './frameWork/routes/chat/chatRoute'

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
        this._port = process.env.PORT || 3560
        this.httpServer = createServer(this._app)
        this.io = new SocketIoServer(this.httpServer, {
            cors: {
                origin: "http://localhost:5173",
                credentials: true
            }
        })

        this._database = new ConnectMongoDB()
        this._database.connectDB()
        this._app.use(
            cors({
                origin: "http://localhost:5173",
                credentials: true
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

            //room created
            socket.on("join_chat", (roomId: string) => {
                socket.join(roomId)
                console.log(`Socket ${socket.id} joined room: ${roomId}`);
            })

            //message recived form frontend and saved in db
            socket.on("send_message", async (messageData) => {
                try {
                    console.log("messageData from socket received", messageData)
                    const savedMessage = await chatUsecase.saveMessage({ input: messageData })

                    socket.to(messageData.roomId).emit("receive_message", savedMessage.message)

                } catch (error) {
                    console.log("error in send_message", error)
                }
            })

            socket.on("disconnect", () => {
                console.log("user disconnected", socket.id)
            })


        })
    }

    listen() {
        this.httpServer.listen(this._port, () => {
            console.log(`server reunned ${this._port}`)
        })
    }

    private _setClientRoutes() {
        console.log("Route called")
        this._app.use('/client/', new UserRoutes().UserRoutes)
    }

    private _setFreelancerRoutes() {
        console.log("freelancer Route called")
        this._app.use("/freelancer", new FreelancerRoutes().FreelancerRoutes)
    }


    private _setChatRoutes() {
        console.log("Chat Route called")
        this._app.use('/chat', new ChatRoute().chatRoutes)
    }
    private _setAdminRoutes() {
        console.log("Admin Route called")
        this._app.use("/admin", new AdminRoutes().AdminRoutes)
    }


}

const app = new App()



