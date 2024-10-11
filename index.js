
import express from 'express';
import body_parser from 'body-parser'
import userRouter from './routes/UserRoute.js';
import mongoose from 'mongoose';
import galleryItemRouter from './routes/galleryItemRouter.js';
import categoryRouter from './routes/categoryRoute.js';
import jwt from 'jsonwebtoken';
const app = express();

app.use(body_parser.json())

const connectionString = "mongodb+srv://tester:123@cluster0.k2sug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


app.use((req, res, next)=>{
       const token = req.header("Authorization")?.replace("Bearer ", "");

       if(token != null){
           jwt.verify(token,"secret",(err, decoded)=>{
                 if(decoded != null){
                    
                    req.user = decoded;
                    
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

const portNumber = 5000;

app.use("/api/users", userRouter);
app.use("/api/gallery", galleryItemRouter);
app.use("/api/category", categoryRouter);

app.listen(portNumber, (req, res) => {
    console.log(`App listening on port ${portNumber}!`);
});