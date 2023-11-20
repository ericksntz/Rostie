import { db } from "../db.js";
import { getUserFromSession } from "../index.js";

export const getItens = (req, res) => {
    const q = "SELECT * FROM item";

    db.query(q, (error, data) =>{
        if(error) return res.json(error);

        return res.status(200).json(data);
    })
}

export const putItens = (req, res) => {
    const q = "UPDATE item SET `nome` = ?, `qntd` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.qntd
    ]

    db.query(q, [...values, req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Item alterado com sucesso!");
    })
}

function existPantrey(callback) {
    const q = "SELECT idDispensa FROM user WHERE id = ?";

    db.query(q, [getUserFromSession().id], (error, data) => {
        if (error) return callback(error, null);
        
        if (data.length !== 0) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    });
}

export const postItens = (req, res) => {
    existPantrey((error, exist) => {
        if (error) return res.json(error);

        if (exist) {
            cadastraItem(req, res);
        } else {
            const q = "UPDATE user SET `idDispensa` = ? WHERE `id` = ?";
            const id = getUserFromSession().id;
            const values = [id, id];

            db.query(q, values, (updateError) => {
                if (updateError) return res.json(updateError);

                cadastraItem(req, res);
            });
        }
    });
};

function cadastraItem(req, res) {
    const q = "INSERT INTO item(`nome`, `qntd`, `idCategoria`, `idDispensa`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.qntd,
        req.body.idCategoria,
        getUserFromSession().idDispensa // Verifique se a propriedade correta está sendo acessada aqui
    ];

    db.query(q, [values], (error) => {
        if (error) return res.json(error);

        return res.status(200).json("Item adicionado a sua despensa com sucesso!");
    });
}

export const putItensMenos = (req, res) => {
    const q = "UPDATE item SET qntd = qntd + 1 WHERE id = ?;";

    const values = [
        req.body.idItem
    ]

    db.query(q, [...values, req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Item incrementado com sucesso!");
    })
}

export const putItensMais = (req, res) => {
    const q = "UPDATE item SET qntd = qntd - 1 WHERE id = ?;";

    const values = [
        req.body.idItem
    ]

    db.query(q, [...values, req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Item decrementado com sucesso!");
    })
}

export const deleteItens = (req, res) => {
    const q = "DELETE FROM item WHERE `nome` = ?";

    db.query(q, [req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Item deletado com sucesso!");
    })
}