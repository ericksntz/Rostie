import { db } from "../db.js";

export const getCategoria = (req, res) => {
    const q = "SELECT * FROM categoria";

    db.query(q, (error, data) =>{
        if(error) return res.json(error);

        return res.status(200).json(data);
    })
}

export const postCategoria = (req, res) => {
    const q = "INSERT INTO categoria(`nome`) VALUES(?)";

    const values = [
        req.body.nome
    ]

    db.query(q, [values], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Categoria criada com sucesso!");
    })
}


export const putCategoria = (req, res) => {
    const q = "UPDATE categoria SET `nome` = ? WHERE `id` = ?";

    const values = [
        req.body.nome
    ]

    db.query(q, [...values, req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Categoria alterada com sucesso!");
    })
}

export const deleteCategoria = (req, res) => {
    const q = "DELETE FROM categoria WHERE `id` = ?";

    db.query(q, [req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Categoria deletada com sucesso!");
    })
}