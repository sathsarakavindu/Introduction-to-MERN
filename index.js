
import express from 'express';
import body_parser from 'body-parser'
import userRouter from './routes/UserRoute.js';
import mongoose from 'mongoose';
import galleryItemRouter from './routes/galleryItem.js';
const app = express();

app.use(body_parser.json());

const connectionString = "mongodb+srv://tester:123@cluster0.k2sug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionString).then(()=>{
                 console.log("Connected to the database")
}).catch(()=>{
    console.log("Connection failed.");
});

//Testing 1

app.use("/api/users", userRouter);
app.use("api/gallery", galleryItemRouter);

app.listen(3000, (req, res) => {
    console.log('App listening on port 3000!');
});