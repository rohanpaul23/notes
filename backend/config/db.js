import mongoose from "mongoose";

const connectDB = async() =>{
    try{
        console.log("Connect DB Called")
        mongoose.set("strictQuery", false);
        const dbConnection =  await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("Mongo DB connected")
        console.log("Mongo DB connected",dbConnection.connection.host)
    }
    catch(e){
        console.error(Error)
        process.exit();
    }
}

export default connectDB;
