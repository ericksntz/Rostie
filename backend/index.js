import express from "express";
import cors from "cors";
import session from "express-session";
import rotasUsuario from "./rotasUsuario.js";
import rotasItem from "./rotasItem.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(session({
    secret: 'SuaChaveSecreta',
    resave: false,
    saveUninitialized: true
  }));

app.use("/user", rotasUsuario);
app.use("/item", rotasItem);

app.get("/teste", (req, res)=>{res.send(getUserFromSession(req))})

app.listen(5752, () => {
    console.log("Servidor rodando na porta 5752");
});

// Função para settar o usuário da sessão  
export const setUserInSession = (req, user) => {
    req.session.user = user;
};
  
// Função para obter o usuário da sessão
export const getUserFromSession = (req) => {
    return req.session.user || null;
};