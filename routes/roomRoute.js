import express from 'express';
import { addRoom, viewRooms, getRoomByCategory, getRoomById, deleteRoomsById } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", addRoom);
roomRouter.get("/", viewRooms);

export default roomRouter;