const express = require('express')

const app = express()

require('./config/database')

app.use(express.json({ limit: '50mb' }));

app.use('/', require('./routes'))

app.listen(3000, () => {
    console.log('Api Iniciada na porta: 3000')
})

module.exports = app