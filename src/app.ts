import express, { Application }  from "express"
import dotenv from 'dotenv'
import {ConnectMongoDB} from './frameWork/database/dbConnection/dbConnection'
import { UserRoutes } from "./frameWork/routes/client/clientRoutes"
dotenv.config()

export class App{
    private _app:Application
    private _port:string|number
    private _database:ConnectMongoDB
    constructor(){
        this._app=express()
        this._port=process.env.PORT||3560
        this._database=new ConnectMongoDB()
        this._database.connectDB()
        this._setClientRoutes()
        this.listen()
    }
    listen(){
        this._app.listen(this._port,()=>{
            console.log(`server reunned ${this._port}`)
        })
    }

    private _setClientRoutes(){
        this._app.use('/client/',new UserRoutes().UserRoutes)
    }

}

const app=new App()

