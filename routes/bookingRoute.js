import express from "express";
import { approveBookingStatus, cancelBooking, createBooking, viewBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/", viewBooking);
bookingRouter.put("/approvebooking/:book_id", approveBookingStatus);
bookingRouter.put("/cancelbooking/:book_id", cancelBooking);

export default bookingRouter;