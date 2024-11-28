import express from "express";
import  {getAllBookings, approveBookingStatus, cancelBooking, createBooking, createBookingUsingCategory, fetchBookingInfoFromEmail, retrieveBookingByDate } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/addBooking", createBooking);
//bookingRouter.get("/", viewBooking);
bookingRouter.put("/approvebooking", approveBookingStatus);
bookingRouter.put("/cancelbooking/:book_id", cancelBooking);
bookingRouter.get("/", getAllBookings);
bookingRouter.get("/get-booking/:mail", fetchBookingInfoFromEmail);
bookingRouter.post("/filter-date", retrieveBookingByDate);
bookingRouter.post("/create-by-category", createBookingUsingCategory);
export default bookingRouter;