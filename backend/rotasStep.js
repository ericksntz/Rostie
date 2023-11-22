import express from "express"
import { getStep, postStep, putStep, deleteStep } from "./controllers/stepController.js";

const roteador = express.Router();

roteador.get("/", getStep)

roteador.post("/", postStep)

roteador.put("/:id", putStep)

roteador.delete("/:id", deleteStep)

export default roteador;