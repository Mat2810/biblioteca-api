const pg = require('pg')

const { Client } = pg

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'biblioteca',
    user: 'postgres',
    password: 'postgre',
})

client.connect().then(() => {
    console.log('Conexão Pronta.')
}).catch((error) => {
    console.log(error)
})

module.exports = client