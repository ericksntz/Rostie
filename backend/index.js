import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import rotasUsuario from "./rotasUsuario.js";

const app = express();

app.use(express.json());
app.use(cors());

const frontendPath = path.join(process.cwd(), "../frontend");

app.use("/user", rotasUsuario);

app.listen(5752, () => {
    console.log("Servidor rodando na porta 5752");
});
