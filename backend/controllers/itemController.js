import { db } from "../db.js";

export const getItens = (req, res) => {
    const q = "SELECT * FROM item";

    db.query(q, (error, data) =>{
        if(error) return res.json(error);

        return res.status(200).json(data);
    })
}

export const postUsuarios = (req, res) => {
    const q = "INSERT INTO user(`nome`, `email`, `senha`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.qntd,
        req.body.categoria,
        req.body.vencimento,
        req.body.image
    ]

    db.query(q, [values], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Item adicionado a sua despensa com sucesso!");
    })
}

export const putUsuarios = (req, res) => {
    const q = "UPDATE user SET `nome` = ?, `qntd` = ?, `categoria` = ?, , `vencimento` = ?, `image` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.qntd,
        req.body.categoria,
        req.body.vencimento,
        req.body.image
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