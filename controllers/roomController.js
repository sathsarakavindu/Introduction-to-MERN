import Room from "../Models/room.js";

export function addRoom(req, res){
    const user = req.user;
    if(user.type != "admin"){
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

export function viewRooms(req, res){

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

export function getRoomById(req, res){

    const room_id = req.params.roomId;

      
}

export function getRoomByCategory(req, res){


}

export function editRoomsById(req, res){


}

export function deleteRoomsById(req, res){


}

export function deleteRoomsByName(req, res){


}