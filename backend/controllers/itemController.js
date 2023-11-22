import { db } from "../db.js";

export const getItens = (req, res) => {
    const q = "SELECT * FROM item WHERE id_user = ?;";

    db.query(q, req.params.id ,(error, data) =>{
        if(error) return res.json(error);

        return res.status(200).json(data);
    })
}

export const checaItens = (id, lista_precisa) => {
    return new Promise((resolve, reject) => {
        const q = "SELECT nome FROM item WHERE id_user = ?;";

        db.query(q, id, (error, data) => {
            if (error) {
                // Lidar com o erro, se houver
                console.error(error);
                reject(error);
            }

            const lista_tem = data.map(item => item.nome); // Preenche lista_tem com os nomes retornados pela consulta

            // Verifica se lista_tem contém todos os elementos de lista_precisa
            const todosItensPresentes = lista_precisa.every(item => lista_tem.includes(item));

            if (todosItensPresentes) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};



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
    const q = "INSERT INTO item(`nome`, `qntd`, `idCategoria`, `id_user`) VALUES(?)";
    const values = [
        req.body.nome,
        req.body.qntd,
        req.body.idCategoria,
        req.params.id
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