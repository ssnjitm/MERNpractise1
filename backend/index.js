import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
dotenv.config();
const app =express();

app.get("/",(req,res)=>{
    res.send("Hello World");
})

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);

app.listen(process.env.PORT || 5000,()=>{
    connectDb();
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
})

// mongoDb_password: bwaLofuTBWxkVm4wh