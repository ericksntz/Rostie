import express from "express"
import { getItens, postItens, putItens, deleteItens } from "./controllers/itemController.js";

const roteador = express.Router();

roteador.get("/", getItens)

roteador.post("/", postItens)

roteador.put("/:id", putItens)

roteador.delete("/:id", deleteItens)

export default roteador;