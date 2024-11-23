import express from "express";
import { createGalleryItem, deleteGalleryItem, getGalleryItems, updateGalleryItem } from "../controllers/galleryItemController.js"
const galleryItemRouter = express.Router();

galleryItemRouter.post("/", createGalleryItem);
galleryItemRouter.get("/", getGalleryItems);
galleryItemRouter.put("/:id", updateGalleryItem);
galleryItemRouter.delete("/:id", deleteGalleryItem);

export default galleryItemRouter;

