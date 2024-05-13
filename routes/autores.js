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

        response.status(400).json ({ error })
    }

})

router.get('/getAutores', (request, response, next) => {

})

router.get('/getAutor/:id', (request, response, next) => {

})

router.delete('/detelete/:id', (request, response, next) => {

})

module.exports = router