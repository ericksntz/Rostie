import { db } from "../db.js";
import { getUserFromSession } from "../index.js";

export const getItens = (req, res) => {
    const q = "SELECT * FROM item";

    db.query(q, (error, data) =>{
        if(error) return res.json(error);

        return res.status(200).json(data);
    })
}

/* export const putItens = (req, res) => {
    const q = "UPDATE item SET `nome` = ?, `qntd` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.qntd
    ]

    db.query(q, [...values, req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Item alterado com sucesso!");
    })
} */

export const postItens = (req, res) => {
    const q = "INSERT INTO item(`nome`, `qntd`, `idCategoria`) VALUES(?)";
    const values = [
        req.body.nome,
        req.body.qntd,
        req.body.idCategoria
    ]

    db.query(q, [values], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Item cadastrado com sucesso!");
    })
};

export const putItensMenos = (req, res) => {
    const q = "UPDATE item SET qntd = ? WHERE id = ?;";
    const values = [(parseInt(req.body.qntd, 10) - 1), req.body.id];

    db.query(q, values, (error, results) => {
        if (error) {
            console.error('Erro ao decrementar item:', error);
            return res.status(500).json({ error: 'Erro interno no servidor ao decrementar o item.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Item não encontrado ou não foi modificado.' });
        }

        return res.status(200).json("Item decrementado com sucesso!");
    });
}

export const putItensMais = (req, res) => {
    const q = "UPDATE item SET qntd = ? WHERE id = ?;";
    const values = [(parseInt(req.body.qntd, 10) + 1), req.body.id];

    db.query(q, values, (error, results) => {
        if (error) {
            console.error('Erro ao decrementar item:', error);
            return res.status(500).json({ error: 'Erro interno no servidor ao decrementar o item.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Item não encontrado ou não foi modificado.' });
        }

        return res.status(200).json("Item incrementado com sucesso!");
    });
}


export const deleteItens = (req, res) => {
    const q = "DELETE FROM item WHERE `nome` = ?";

    db.query(q, [req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Item deletado com sucesso!");
    })
}