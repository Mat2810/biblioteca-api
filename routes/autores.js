const express = require('express')
const client = require('../config/database')

const router = express.Router()


router.post('/create', async (request, response, next) => {
    try {
        const { id, nome, nacionalidade, data_nascimento } = request.body

        const query = {
            text: 'INSERT INTO "Autores" (id, nome, nacionalidade, data_nascimento) VALUES ($1, $2, $3, $4);',
            values: [id, nome, nacionalidade, data_nascimento]
        }
        const autores = await client.query(query)

        console.log(autores)

        response.json({ success: true, autores: autores })
    }
    catch (error) {
        console.log(error)

        response.status(200).json ({ error })
    }

})

router.get('/getAutores', async (request, response, next) => {
    const autores =  await client.query('SELECT * FROM "autores"')

    response.status(200).json({ success: true, autores: autores.row })
})

router.get('/getAutor/:id', async (request, response, next) => {
    const autores_id = request.params.autores_id

    const autores = await client.query ({ 
        text: 'SELECT * FROM "autores" WHERE id = $1 LIMIT 1',
        values: [autores_id]
     })

     if (!autores.rows[0]) return response.status(401).send('Autor não encontrado')
})

router.delete('/detelete/:id', async (request, response, next) => {
    const id = request.params.id
    
    const autores = await client.query (`SELECT * FROM "Autores" WHERE id = ${id}`)

    console.log (autores)

    response.json({ autores: autores.row })
})

module.exports = router