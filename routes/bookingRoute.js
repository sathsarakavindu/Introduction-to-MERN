import express from "express";
import getAllBookings, { approveBookingStatus, cancelBooking, createBooking, createBookingUsingCategory, retrieveBookingByDate, viewBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
//bookingRouter.get("/", viewBooking);
bookingRouter.put("/approvebooking/:book_id", approveBookingStatus);
bookingRouter.put("/cancelbooking/:book_id", cancelBooking);
bookingRouter.get("/", getAllBookings);
bookingRouter.post("/filter-date", retrieveBookingByDate);
bookingRouter.post("/create-by-category", createBookingUsingCategory);
export default bookingRouter;