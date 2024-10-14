import Booking from "../Models/booking.js";
import { isCustomerValid } from "./userControllers.js";

export function createBooking(req, res){

    if(!isCustomerValid(req)){
        res.status(403).json({message: "Forbidden."});
    return;
    }

    var startingId = 1000;

    Booking.countDocuments({}).then((count)=>{
    const newId = startingId + count + 1;
    console.log(newId);
    const newBooking = new Booking({
         bookingId: newId,
         roomId: req.body.roomId,
         email: req.user.email,
         start: req.body.start,
         end: req.body.end
    })
    newBooking.save().then((result)=>{
           res.json({
            message: "Booking created successfully",
            result: result
           });
    }).catch((err)=>{console.log(err);
          res.json({
            message: "Booking created failed",
            error: err
          });
    })
  }).catch(()=>{

  });
}