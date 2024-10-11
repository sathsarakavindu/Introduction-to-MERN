import express from "express";
import { createCategory, viewCategory } from "../controllers/categorryController.js";


const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", viewCategory);


export default categoryRouter;