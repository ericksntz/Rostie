import express from "express"
import { getItens, postItens, putItensMais, putItensMenos, deleteItens } from "./controllers/itemController.js";

const roteador = express.Router();

roteador.get("/:id", getItens)

roteador.post("/:id", postItens)

//roteador.put("/:id", putItens)

roteador.put("/decremento", putItensMenos)

roteador.put("/incremento", putItensMais)

roteador.delete("/:id", deleteItens)

export default roteador;