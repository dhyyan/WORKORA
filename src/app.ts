import express, { Application }  from "express"
import dotenv from 'dotenv'
import {ConnectMongoDB} from './frameWork/database/dbConnection/dbConnection'
dotenv.config()

export class App{
    private _app:Application
    private _port:string|number
    private _database:ConnectMongoDB
    constructor(){
        this._app=express()
        this._port=process.env.PORT||3560
        this.listen()
        this._database=new ConnectMongoDB()
        this._database.connectDB()
    }
    listen(){
        this._app.listen(this._port,()=>{
            console.log(`server reunned ${this._port}`)
        })
    }
}

const app=new App()

