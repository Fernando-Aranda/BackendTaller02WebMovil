import { Router } from "express";
import { getRecetas, createReceta, getReceta, deleteReceta, updateReceta } from "../controllers/recetas.controller.js";

const router = Router();

router.get("/", getRecetas);
router.post("/", createReceta);
router.get("/:id", getReceta);
router.delete("/:id", deleteReceta);
router.put("/:id", updateReceta); 

export default router;
