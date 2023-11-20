import { db } from "../db.js";
import { User } from "../Entidades.js";
import { setUserInSession } from "../index.js";

export const getUsuarios = (req, res) => {
    const q = "SELECT * FROM user";

    db.query(q, (error, data) =>{
        if(error) return res.json(error);

        return res.status(200).json(data);
    })
}

export const postUsuarios = (req, res) => {
    const q = "INSERT INTO user(`nome`, `email`, `senha`) VALUES(?)";
    const values = [
        req.body.nome,
        req.body.email,
        req.body.senha,
    ]

    db.query(q, [values], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Usuário criado com sucesso!");
    })
}

export const postLoginUsuario = (req, res) => {
    console.log("chegou aqui!");
    const q = "SELECT id, nome, email, senha FROM user WHERE email = ? AND senha = ?";
    const values = [
        req.body.email,
        req.body.senha
    ];
    db.query(q, values, (error, data) => {
        if(error) {
            return res.json(error);
        } else {
            if(data.length !== 0) {
                const user = {
                    id: data[0].id, 
                    nome: data[0].nome,
                    email: data[0].email,
                    senha: data[0].senha,
                };
                setUserInSession(req, user);
                console.log(user);
                return res.status(200).json(true);
            } else {
                console.log("false")
                return res.status(200).json(false);
            }
        }
    });
};



export const putUsuarios = (req, res) => {
    const q = "UPDATE user SET `nome` = ?, `email` = ? WHERE `id` = ?";

    const values = [
        
        req.body.nome,
        req.body.email
    ]

    db.query(q, [...values, req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Usuário alterado com sucesso!");
    })
}

export const deleteUsuarios = (req, res) => {
    const q = "DELETE FROM user WHERE `id` = ?";

    db.query(q, [req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Usuário deletado com sucesso!");
    })
}