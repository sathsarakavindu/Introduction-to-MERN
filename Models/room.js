import mongoose from 'mongoose';

const RoomModel = mongoose.Schema({
   room_id:{
    type: String,
    required: true,
    unique: true
   },
   room_name:{
    type: String,
    required: true
   },
   room_category:{
    type: String,
    required: true
   },
   booking_status:{
    type: Boolean,
    required: true
   },
   num_of_guests:{
    type: Number,
    required: true
   },
   photos: [
    {
     type: String,
     required: true 
    }
   ],
   description: {
    type: String
   },
   is_special:{
    type: Boolean,
    default: false,
   }
});

const Room = mongoose.model("Rooms", RoomModel);

export default Room;