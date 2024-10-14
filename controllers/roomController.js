import Room from "../Models/room.js";
import { isAdminValid } from "./userControllers.js";

export function addRoom(req, res){
    //const user = req.user;
    if(!isAdminValid(req)){
      res.status(
        403
      ). json({message: "You haven't access to add rooms"});
      return;
    }
    else{
      const roomData = req.body;
      const addRooms = new Room(roomData);
      addRooms.save().then((list)=>{

        if(list != null){
            res.status(201).json({
              status: "Room sucessfully created.!",
              details: list
            });
        }

      }).catch(()=>{
        res.status(404).json({
            status: "Room can't be created.!"
          });
      });
    }

}

export function getRooms(req, res){

    Room.find().then((result)=>{
        if(result != null)
       {  res.status(200).json({
           status: "Sucessfully",
           list: result
         });}
         else{
            res.status(404).json({
                status: "Rooms are not available"
                
              });
         }
    }).catch(()=>{
        res.status(500).json({
            status: "Room can't be found."
            
          });
    });

}

export function findRoomById(req, res){

    const roomID = req.params.roomId;

    Room.findOne({room_id: roomID}).then((result)=>{
        if(result != null){
               res.status(200).json({
                message: "Room founded", 
                list: result
               });
        
              }
        else{
          res.status(404).json({
            message: "Room not founded"
           });
        }
    }).catch((err)=>{
      res.status(200).json({
        error: err
       });
    });
      
}

export function getRoomByCategory(req, res){

   const cat_ = req.params.category;

   Room.findOne({room_category: cat_}).then((result)=>{
            if(result != null){
              res.status(200).json({rooms: result});
            }
            else{
              res.status(403).json({message: "Not available"});
            }
   }).catch(()=>{
    res.status(200).json({error: "Can't be found"});
   });

}

// export function editRoomsById(req, res){


// }

// export function deleteRoomsById(req, res){


// }

// export function deleteRoomsByName(req, res){


// }

export function deleteRoom(req, res){
  if(!isAdminValid(req)){
    res.status(403).json({
      message: "Forbidden"
    });
    return;
  }

  const roomId = req.params.roomId;
  Room.findOneAndDelete({room_id: roomId}).then(()=>{
res.json({message: "Room deleted successfully..!"});
  }).catch(()=>{
       res.json({error: "Room deletion failed"});
  });
}

export function updateRoom(req, res){
     if(!isAdminValid(req)){
      res.status(404).json({
        message: "Forbidden"
       });
       return;
     }

     const roomId = req.params.roomId;
  Room.findOneAndUpdate({
    room_id: roomId
  }, req.body).then((result)=>{
    res.status(200).json({
      message: "Room updated",
      list: result
    });
  }).catch(()=>{
    res.status(500).json({
      message: "Room can't be updated."
    });
  });
  
}