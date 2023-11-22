import express from "express"
import { getRecipe, postRecipe, postAllRecipe, putRecipe, deleteRecipe } from "./controllers/recipeController.js";

const roteador = express.Router();

roteador.get("/", getRecipe)

roteador.post("/all/:id", postAllRecipe);

roteador.post("/", postRecipe)

roteador.put("/:id", putRecipe)

roteador.delete("/:id", deleteRecipe)

export default roteador;