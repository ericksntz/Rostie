import { db } from "../db.js";

export const getStep = (req, res) => {
    const q = "SELECT * FROM step";

    db.query(q, (error, data) =>{
        if(error) return res.json(error);

        return res.status(200).json(data);
    })
}

export const postStep = (req, res) => {
    const q = "INSERT INTO step(`etapa`, `id_recipe`) VALUES(?, ?)";
    
    const values = [
        req.body.etapa,
        req.body.id_recipe
    ];

    db.query(q, values, (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Etapa criada com sucesso!");
    })
}

export const putStep = (req, res) => {
    const q = "UPDATE step SET `etapa` = ? WHERE `id` = ?";

    const values = [
        req.body.etapa
    ];

    db.query(q, [...values, req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Etapa alterada com sucesso!");
    })
}

export const deleteStep = (req, res) => {
    const q = "DELETE FROM step WHERE `id` = ?";

    db.query(q, [req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Etapa deletada com sucesso!");
    })
}
