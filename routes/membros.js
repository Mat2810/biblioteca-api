const express = require('express')
const client = require('../config/database')

const router = express.Router()

router.post('/create', async (request, response, next) => {
    try {
        const { id, nome, endereco, email, numero_telefone } = request.body

        const query = {
            text: 'INSERT INTO "Membros" ( id, nome, endereco, email, numero_telefone) VALUES ($1, $2, $3, $4, $5);',
            values: [id, nome, endereco, email, numero_telefone]
        }

        const membro = await client.query(query)

        console.log(membro)

        response.json({ success: true, membro: membro })
    } catch (error) {
        console.log(error)

        response.status(200).json({ error })
    }
})

router.get('/getMembros', async (request, response, next) => {
    const membro = await client.query ('SELECT * FROM "Membros"')

    response.status(200).json({ success:true, membros: membro.rows })
})

router.get('/getMembro/:id', async (request, response, next) => {
    const membro_id = request.params.membro_id

    const membro = await client.query ({
        text: 'SELECT * FROM "Membros" WHERE id = $1 LIMIT 1',
        values: [membro_id]
    })

    if (!membro.row[0]) return response.status(400).send('Membro não encontrado')
})

router.delete('/delete/:id', async (request, response, next) => {
    const id = request.params.id 

    const membro = await client.query(`SELECT * FROM "Membros" WHERE id = ${id}`)

    console.log(membro)

    response.json({ membro: membro.row })
})

module.exports = router