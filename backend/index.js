import express from "express";
import cors from "cors";
import session from "express-session";
import rotasUsuario from "./rotasUsuario.js";
import rotasItem from "./rotasItem.js";
import rotasCategoria from "./rotasCategoria.js";
import rotasRecipe from "./rotasRecipe.js";
import rotasIngrediente from "./rotasIngrediente.js";
import rotasStep from "./rotasStep.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
      // Permitir todas as origens locais
      if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));

app.use(session({
    secret: 'USAR A SESSAO TERIA FACILITADO NOSSA VIDA', // A chave secreta para assinar o cookie da sessão
    resave: false,
    saveUninitialized: true,
    cookie: {
    secure: false, // Defina como true se estiver usando HTTPS
    maxAge: 3600000
    }
}));

app.use("/user", rotasUsuario);
app.use("/item", rotasItem);
app.use("/categoria", rotasCategoria);
app.use("/receita", rotasRecipe);
app.use("/ingrediente", rotasIngrediente);
app.use("/step", rotasStep);

app.get("/teste", (req, res)=>{res.send(getUserFromSession(req))})

app.listen(5752, () => {
    console.log("Servidor rodando na porta 5752");
});
