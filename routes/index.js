const express = require('express')

const router = express.Router()

router.use('/livros', require('./livros'))

router.use('/autores', require('./autores'))

module.exports = router