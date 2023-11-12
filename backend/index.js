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

// Configurar para servir arquivos estáticos do diretório 'style'
app.use(express.static(path.join(frontendPath, "style")));

app.get("/", (req, res) => {
    // Caminho completo para o arquivo 'home.html'
    const filePath = path.join(frontendPath, "pages", "home.html");

    // Verificar se o arquivo existe antes de tentar enviá-lo
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send("Arquivo não encontrado");
    }
});

app.listen(5752, () => {
    console.log("Servidor rodando na porta 5752");
});
