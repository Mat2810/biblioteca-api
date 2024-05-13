const express = require('express')
const client = require('../config/database')

const router = express.Router()

// INSERT
router.post('/create', async (request, response, next) => {
    try {
        const { id, titulo, isbn, categoria, quantidade, autor_id } = request.body

        // Realiza os INSERTS

        const query = {
            text: 'INSERT INTO "Livros" (id, titulo, isbn, categoria, quantidade, autor_id) VALUES ($1, $2, $3, $4, $5, $6);',
            values: [id, titulo, isbn, categoria, quantidade, autor_id]
        }

        const livro = await client.query(query)

        console.log(livro)

        response.json({ success: true, livro: livro })
    } catch (error) {
        console.log(error)

        response.status(200).json({ error })
    }
})

router.get('/getLivros', async (req, res, next) => {
    const livros = await client.query('SELECT * FROM "Livros" JOIN "Autores" ON "Livros".autor_id = "Autores".id;')

    res.status(200).json({ success: true, livros: livros.rows })
})

router.put('/novoEmprestimo/:livro_id', async (req, res, next) => {
    const livro_id = req.params.livro_id

    const livro = await client.query({
        text: 'SELECT * FROM "Livros" WHERE id = $1 LIMIT 1',
        values: [livro_id]
    })
    
    if(!livro.rows[0]) return res.status(401).send('Livro não encontrado')

    const quantidade = livro.rows[0].quantidade
    
    await client.query(`UPDATE "Livros" SET quantidade = ${quantidade - 1} WHERE id = ${livro_id}`)

    res.json({ success: true })
})

router.get('/getLivro/:id', async (req, res, next) => {
    const id = req.params.id

    const livro = await client.query (`SELECT * FROM "Livros" WHERE id = ${id}`)
    
    console.log(livro)

    res.json({ livro: livro.rows })
} )

module.exports = router