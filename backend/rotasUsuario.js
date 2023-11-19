import express from "express";
import { getUsuarios, postUsuarios, postLoginUsuario, putUsuarios, deleteUsuarios } from "./controllers/usuarioController.js";

const rotasUsuario = express.Router();

rotasUsuario.get("/", getUsuarios);
rotasUsuario.post("/", postUsuarios);
rotasUsuario.post("/login", postLoginUsuario);
rotasUsuario.put("/:id", putUsuarios);
rotasUsuario.delete("/:id", deleteUsuarios);

export default rotasUsuario;
