import dotenv from 'dotenv'
dotenv.config()
import cors from "cors"
import express, { Application } from "express"
import { ConnectMongoDB } from './frameWork/database/dbConnection/dbConnection'
import { UserRoutes } from "./frameWork/routes/client/clientRoutes"
import { FreelancerRoutes } from './frameWork/routes/freelancers/freelancerRoutes'
import { AdminRoutes } from './frameWork/routes/admin/adminRoutes'


export class App {
    private _app: Application
    private _port: string | number
    private _database: ConnectMongoDB
    constructor() {
        this._app = express()
        this._port = process.env.PORT || 3560
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
        this.listen()
    }
    listen() {
        this._app.listen(this._port, () => {
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

    private _setAdminRoutes() {
        console.log("Admin Route called")
        this._app.use("/admin", new AdminRoutes().AdminRoutes)
    }


}

const app = new App()



