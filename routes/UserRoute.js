import express from 'express'
import { postUsers, loginUser, userDisable } from '../controllers/userControllers.js';
const userRouter = express.Router();



userRouter.post("/", postUsers);
userRouter.post("/login", loginUser);
userRouter.put("/accountdisable", userDisable);

export default userRouter;
