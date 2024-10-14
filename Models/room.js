import mongoose from 'mongoose';

const RoomModel = mongoose.Schema({
   room_id:{
    type: String,
    required: true,
    unique: true
   },
   // room_name:{
   //  type: String,
   //  required: true
   // },
   room_category:{
    type: String,
    required: true
   },
   booking_status:{
    type: Boolean,
    required: true,
    default: false
   },
   num_of_guests:{
    type: Number,
    required: true,
    default: 3
   },
   available: {
   type: Boolean,
   required: true,
   default: true
   },
   photos: [
    {
     type: String,

    }
   ],
   specialDescription: {
    type: String,
    default: ""
   },
   is_special:{
    type: Boolean,
    default: false,
    required: true
   }
});

const Room = mongoose.model("Rooms", RoomModel);

export default Room;