import express from "express"
import { getIngredient, postIngredient, putIngredient, deleteIngredient } from "./controllers/ingredienteController.js";

const roteador = express.Router();

roteador.get("/", getIngredient)

roteador.post("/", postIngredient)

roteador.put("/:id", putIngredient)

roteador.delete("/:id", deleteIngredient)

export default roteador;