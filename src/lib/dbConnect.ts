
import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number
};

const connection: connectionObject = {}; 

async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to detaBase")
        return
    };

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})

        connection.isConnected = db.connections[0].readyState
       console.log('DB connected Succesfully!')
    } catch (error) {
        console.log('DataBase connections faild', error)

        process.exit(111)
    }
};

export default dbConnect;