import mongoose from "mongoose";

mongoose.connection.on('connected',()=>{ console.log('Database connected');});

//Function to connect to mongodb database
export const connectdb = async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);
    }
    catch(error){   
        console.log(error);
    }
}