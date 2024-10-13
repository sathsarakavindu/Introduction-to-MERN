import express from "express";
import { createCategory, viewCategory, deleteCategory, getCategoryByName, getCategoryByPrice } from "../controllers/categorryController.js";


const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", viewCategory);
categoryRouter.get("/getname/:name", getCategoryByName);
categoryRouter.get("/getprice/:price", getCategoryByPrice);
categoryRouter.delete("/:name", deleteCategory);
// categoryRouter.delete("/", deleteCategory);

export default categoryRouter;