import Booking from "../Models/booking.js";
import category from "../Models/category.js";
import Room from "../Models/room.js";
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
         category: req.body.category,
         email: req.body.email,
         start: req.body.start,
         status: req.body.status,
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


// export function getAllBookings(req, res){
//     if(!isAdminValid(req)){
//       res.status(404).json({message: "You can't view bookings."})
//     }
//     else{
//       Booking.find().then((result)=>{
//         res.status(200).json({messsage: "Successfully fetched bookings.", result: result});
//       }).catch((err)=>{
//         res.status(500).json({msg: "Can't be fetched booking", error: err});
//       })
//     }
// }



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
     const bookingID = req.body.bookingId;
     console.log(`Book id is ${req.body.bookingId}`);
     if(bookingID != null){
      Booking.findOneAndUpdate({bookingId: req.body.bookingId}, {status: "Approved"}).then((result)=>{
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
  
    Booking.findOneAndUpdate({bookingId: req.body.bookingId}, {status: true}).then((result)=>{
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

export function getAllBookings(req, res){
  Booking.find().then((result)=>{
     res.json(
      {
        message: "All booking.", result: result
      }
    )
  }).catch((err)=>{
    res.json(
      {
        message: "Failed to get all booking", 
        error: err
      }
    )
  })
}

export function retrieveBookingByDate(req, res){
     const start = req.body.start;
     const end = req.body.end;
     console.log(start);
     console.log(end);

     Booking.find({
      start: {
        $gte: start,
      },
      end: {
        $lt: new Date(end)
      }
    
     }).then((result)=>{
      res.json(
        {
          message: "Filtered bookings",
          result: result
        }
      )
     }).catch((err)=>{
      res.json({
        message: "Failed to get filtered booking",
        error: err
      })
     })
}

export function createBookingUsingCategory(req, res){
   const start = new Date(req.body.start);
   const end = new Date(req.body.end);
   Booking.find({
    $or : [
     { start: {
        $gte: start,
        $lt: end
      }
     },
     {
        end: {
          $gt: start,
          $lte: end
        }
     }
    ]
   }).then((response)=>{
      const overlappingBookings = response;
      const rooms = [];

      for(let i = 0; i < overlappingBookings.length; i++ ){
        rooms.push(overlappingBookings[i].roomId);
      }
      
      Room.find({
        roomId: {
          $nin: rooms
        },
        category: req.body.category
      }).then((rooms)=>{
          if(rooms.length == 0){
            res.json({
              message: "No rooms are available."
            })
          }
          else{
            var startingId = 1000;

            Booking.countDocuments({}).then((count)=>{
            const newId = startingId + count + 1;
            console.log(newId);
            const newBooking = new Booking({
                 bookingId: newId,
                 roomId: rooms[0].roomId,
                 email: req.body.user.email,
                 start: start,
                 end: end
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
      })
   })
}

export function fetchBookingInfoFromEmail(req, res){
 

     if(isCustomerValid(req)){
         Booking.find({email: req.params.mail}).then((result)=>{
              console.log(result);
              res.status(200).json({result: result});
         }).catch((err)=>{
          
             console.log( "Error for fetching " + err);
        });
     }
     else{
      console.log("Please login...");
     }
     
}