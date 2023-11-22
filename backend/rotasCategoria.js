import express from "express"
import { getCategoria, postCategoria, putCategoria, deleteCategoria } from "./controllers/categoriaController.js";

const roteador = express.Router();

roteador.get("/", getCategoria)

roteador.post("/", postCategoria)

roteador.put("/:id", putCategoria)

roteador.delete("/:id", deleteCategoria)

export default roteador;