import { db } from "../db.js";

export const getIngredient = (req, res) => {
    const q = "SELECT * FROM ingredient";

    db.query(q, (error, data) =>{
        if(error) return res.json(error);

        return res.status(200).json(data);
    })
}

export const postIngredient = (req, res) => {
    const q = "INSERT INTO ingredient(`id_recipe`, `nome`) VALUES(?, ?)";
    
    const values = [
        req.body.id_recipe,
        req.body.nome
    ];

    db.query(q, values, (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Ingrediente criado com sucesso!");
    })
}

export const putIngredient = (req, res) => {
    const q = "UPDATE ingredient SET `nome` = ? WHERE `id` = ?";

    const values = [
        req.body.nome
    ];

    db.query(q, [...values, req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Ingrediente alterado com sucesso!");
    })
}

export const deleteIngredient = (req, res) => {
    const q = "DELETE FROM ingredient WHERE `id` = ?";

    db.query(q, [req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Ingrediente deletado com sucesso!");
    })
}
