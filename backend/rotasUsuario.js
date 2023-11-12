import express from "express"
import { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } from "./controladores/usuarioController.js";

const roteador = express.Router();

roteador.get("/", getUsuarios)

roteador.post("/", postUsuarios)

roteador.put("/:id", putUsuarios)

roteador.delete("/:id", deleteUsuarios)

export default roteador;