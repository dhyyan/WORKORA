import mongoosh from 'mongoose'

export class ConnectMongoDB{
private _mongoUrl:string
    constructor(){
        if(!process.env.MONGODB_URL)throw new Error("mongodb url not available")
        else this._mongoUrl=process.env.MONGODB_URL
    }

    async connectDB(){
        try {
            await mongoosh.connect(this._mongoUrl)
            console.log("db connected")
        } catch (error) {
            console.log(error)
        }
    }
}