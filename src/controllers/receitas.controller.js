import { db } from "../database/database.connection.js"

export async function getReceitas(req, res) {
    try {
        const receitas = await db.query(`SELECT * FROM receitas;`)
        console.table(receitas.rows)
        res.send(receitas.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getReceitaById(req, res) {
    const { id } = req.params

    try {
        const resReceitas = await db.query(`
            SELECT receitas.*, categorias.nome AS categoria
                FROM receitas 
                JOIN receitas_categorias
                    ON receitas.id = receitas_categorias.id_receita
                JOIN categorias
                    ON categorias.id = receitas_categorias.id_categoria
                WHERE receitas.id=$1;`
        , [id])

        const receita = {
            ...resReceitas.rows[0], 
            categorias: resReceitas.rows.map(rec => rec.categoria)
        }
        delete receita.categoria
        res.send(receita)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createReceita(req, res) {
    res.send("createReceita")
}

export async function deleteReceita(req, res) {
    res.send("deleteReceita")
}

export async function editReceitaById(req, res) {
    res.send("editReceitaById")
}