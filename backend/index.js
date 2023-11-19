import express from "express";
import cors from "cors";
import rotasUsuario from "./rotasUsuario.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", rotasUsuario);

app.listen(5752, () => {
    console.log("Servidor rodando na porta 5752");
});
