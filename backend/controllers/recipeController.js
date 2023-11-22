import { db } from "../db.js";
import { checaItens } from "./itemController.js";

export const getRecipe = (req, res) => {
    const q = "SELECT * FROM recipe";

    db.query(q, (error, data) =>{
        if(error) return res.json(error);

        return res.status(200).json(data);
    })
}

export const postRecipe = (req, res) => {
    const q = "INSERT INTO recipe(`nome`, `image`) VALUES(?)";
    const formatarString = str => str.toLowerCase().replace(/\s/g, '-').normalize('NFD').replace(/[\u0300-\u036f|\W]/g, '') + '.jpeg';
    const nome = req.body.nome;
    const values = [
        nome,
        formatarString(nome)
    ]

    db.query(q, [values], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Receita criada com sucesso!");
    })
}


export const putRecipe = (req, res) => {
    const q = "UPDATE recipe SET `nome` = ? WHERE `id` = ?";

    const values = [
        req.body.nome
    ]

    db.query(q, [...values, req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Recipe alterada com sucesso!");
    })
}

export const deleteRecipe = (req, res) => {
    const q = "DELETE FROM recipe WHERE `id` = ?";

    db.query(q, [req.params.id], (error) =>{
        if(error) return res.json(error);

        return res.status(200).json("Recipe deletada com sucesso!");
    })
}

export const postAllRecipe = async (req, res) => {
    try {
        const q = `
        SELECT r.id AS id_recipe, r.nome AS recipe_name, r.image AS recipe_image,
        GROUP_CONCAT(i.nome SEPARATOR ', ') AS ingredient_list
        FROM recipe r
        LEFT JOIN ingredient i ON r.id = i.id_recipe
        GROUP BY r.id;`;

        const data = await new Promise((resolve, reject) => {
            db.query(q, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

        const recipesWithIngredientsAsArray = data.map(recipe => {
            return {
                id_recipe: recipe.id_recipe,
                recipe_name: recipe.recipe_name,
                recipe_image: recipe.recipe_image,
                ingredient_list: recipe.ingredient_list ? recipe.ingredient_list.split(',').map(item => item.trim()) : []
            };
        });

        const recipesToReturn = [];
        for (const recipe of recipesWithIngredientsAsArray) {
            const ingredientesDaReceita = recipe.ingredient_list;
            const usuarioTemIngredientes = await checaItens(req.params.id, ingredientesDaReceita);
            if (usuarioTemIngredientes) {
                recipesToReturn.push(recipe);
            }
        }

        res.status(200).json(recipesToReturn);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar a requisição' });
    }
};
