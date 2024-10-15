import Booking from "../Models/booking.js";
import { isAdminValid, isCustomerValid } from "./userControllers.js";

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

export function viewBooking(req, res){

  if(isCustomerValid(req)){
        Booking.find({email: req.user.email}).then((result)=>{
              if(result != null){
                res.status(200).json({
                  message: "Your find successfull",
                  list: result      
                });
              }
              else{
                res.status(404).json({
                  message: "No booked rooms.",
                  list: result      
                })
              }
        }).catch((err)=>{
          res.status(500).json({
            Message: "Data can't be found",
            error: err
             
          });
        });
        return;
  }
  if(isAdminValid(req)){
   Booking.find().then((result)=>{
    res.status(200).json({
      Message: "All booked rooms.",
      list: result
       
    });
   }).catch((err)=>{
    res.status(500).json({
      Message: "Booked rooms can't be found",
      error: err
       
    });
   });
   return;
  }
  else{
    res.json({
      Message: "Please login to the system"
       
    });
  }
    
}


export function approveBookingStatus(req, res){
  if(isAdminValid(req)){
     const bookingID = req.params.book_id;
     console.log(bookingID);
     if(bookingID != null){
      Booking.findOneAndUpdate({bookingId: bookingID}, {status:req.body.status}).then((result)=>{
        if(result != null){
          res.status(201).json({
            message: "Booking approved successfully", 
            result: result
          });
        }
        else{
          res.status(403).json({
            msg: "Booking details are not available"
          });
        }
        
      }).catch((e)=>{
        res.status(500).json({
          msg: "Can't be found booking info..",
          err: e
        });
      });
     }
     else{
      res.status(403).json({msg: "No booking Id"});
     }
  }
  else{
    res.status(404).json({msg: "You haven't access to approve booking."});
  }
}

export function cancelBooking(req, res){

   if(isAdminValid(req)){
    const bookID = req.params.book_id;
    Booking.findOneAndUpdate({bookingId: bookID}, {status: req.body.status}).then((result)=>{
      if(result != null){
        res.status(200).json({
          message: "Successfully updated.",
          result: result
        });
      }
      else{
        res.status(404).json({
          message: "Not available booking."
        });
      }
    }).catch((e)=>{
      res.status(500).json({
        message: "Can't be found the booking."
      });
    });
   }else{
    res.status(500).json({
      message: "You haven't access to cancelling booking."
    });
   }

}