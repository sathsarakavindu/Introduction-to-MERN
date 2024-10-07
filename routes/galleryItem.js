import express from "express";
import { createGalleryController } from ""
const galleryItemRouter = express.Router();

galleryItemRouter.post("/", createGalleryController);


export default galleryItemRouter;

