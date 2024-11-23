
import express from 'express';
import body_parser from 'body-parser'
import userRouter from './routes/UserRoute.js';
import mongoose from 'mongoose';
import galleryItemRouter from './routes/galleryItemRouter.js';
import categoryRouter from './routes/categoryRoute.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import roomRouter from './routes/roomRoute.js';
import bookingRouter from './routes/bookingRoute.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

app.use(body_parser.json())

const connectionString = process.env.MONGO_URL;


app.use((req, res, next)=>{
       const token = req.header("Authorization")?.replace("Bearer ", "");
       console.log(token);
 const secret_key = process.env.SECRET_KEY;
       if(token != null){
           jwt.verify(token,secret_key,(err, decoded)=>{
                 if(decoded != null){
                    
                    req.body.user = decoded;
                   
                    next()
                 }else{
                    console.log(err)
                    next()
                 }
                
           });
    
       }else{
        console.log("Token is null");
        next()
       }
});


mongoose.connect(connectionString).then(()=>{
                 console.log("Connected to the database")
}).catch(()=>{
    console.log("Connection failed.");
});

//Testing 1

const portNumber = process.env.PORT_NUMBER;

app.use("/api/users", userRouter);
app.use("/api/gallery", galleryItemRouter);
app.use("/api/category", categoryRouter);
app.use("/api/room", roomRouter);
app.use("/api/booking", bookingRouter);

app.listen(portNumber, (req, res) => {
    console.log(`App listening on port ${portNumber}!`);
});