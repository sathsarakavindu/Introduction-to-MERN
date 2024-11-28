import express from 'express'
import { postUsers, loginUser, userDisable, getUser, getOnlyCustomers, userEnable, verifyUserEmail } from '../controllers/userControllers.js';
const userRouter = express.Router();



userRouter.post("/", postUsers);
userRouter.post("/login", loginUser);
// userRouter.post("/email", sendOtpEmail);
userRouter.put("/accountdisable", userDisable);
userRouter.put("/accountenable", userEnable);
userRouter.get("/", getUser);
userRouter.post("/all-users", getOnlyCustomers);
userRouter.post("/verify-email", verifyUserEmail);
export default userRouter;
