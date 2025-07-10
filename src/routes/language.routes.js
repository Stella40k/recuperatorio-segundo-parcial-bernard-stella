import { Router } from "express";
import { getAllPrograma, getProgramaById, createPrograma, updatePrograma,deletePrograma } from "../controllers/language.controller.js";
export const routes = Router()

routes.get("/languages", getAllPrograma),
routes.get("/languages/:id", getProgramaById),
routes.post("/languages", createPrograma),
routes.put("/languages/:id", updatePrograma),
routes.delete("/languages/:id", deletePrograma)