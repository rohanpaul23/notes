
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";




const app = express();
dotenv.config();
connectDB()
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is running");
})

app.use("/api/users",userRoutes)
app.use("/api/notes",notesRoutes)

app.use(notFound);
app.use(errorHandler);


app.listen(process.env.PORT,console.log("Server Started on PORT"+ process.env.PORT))