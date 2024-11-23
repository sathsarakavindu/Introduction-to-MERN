import express from 'express'
import { postUsers, loginUser, userDisable, getUser, getOnlyCustomers, userEnable } from '../controllers/userControllers.js';
const userRouter = express.Router();



userRouter.post("/", postUsers);
userRouter.post("/login", loginUser);
userRouter.put("/accountdisable", userDisable);
userRouter.put("/accountenable", userEnable);
userRouter.get("/", getUser);
userRouter.get("/all-users", getOnlyCustomers);
export default userRouter;
