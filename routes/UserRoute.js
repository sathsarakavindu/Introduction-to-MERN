import express from 'express'
import { getUsers,putUsers,deleteUsers,postUsers  } from '../controllers/userControllers.js';
const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.post("/", postUsers);

userRouter.delete("/", deleteUsers); 

userRouter.put("/", putUsers);

export default userRouter;
