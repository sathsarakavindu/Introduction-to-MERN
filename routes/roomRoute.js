import express from 'express';
import { addRoom, getRooms, deleteRoom, findRoomById, updateRoom, getRoomByCategory, maintainRoom } from '../controllers/roomController.js';


const roomRouter = express.Router();

roomRouter.post("/", addRoom);
roomRouter.delete("/:roomId", deleteRoom);
roomRouter.get("/", getRooms);
roomRouter.get("/by-category/:category", getRoomByCategory);
roomRouter.get("/:roomId", findRoomById);
roomRouter.put("/maintain", maintainRoom);
roomRouter.put("/:roomId", updateRoom);

export default roomRouter;