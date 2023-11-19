import express from "express"
import { getUsuarios, postUsuarios, postLoginUsuario,putUsuarios, deleteUsuarios } from "./controllers/usuarioController.js";

const roteador = express.Router();

roteador.get("/", getUsuarios)

roteador.post("/", postUsuarios)

roteador.post("/", postLoginUsuario)

roteador.put("/:id", putUsuarios)

roteador.delete("/:id", deleteUsuarios)

export default roteador;