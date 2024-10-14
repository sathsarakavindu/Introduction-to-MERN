import express from "express";
import { approveBookingStatus, createBooking, viewBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/", viewBooking);
bookingRouter.put("/changestatus/:book_id", approveBookingStatus);

export default bookingRouter;