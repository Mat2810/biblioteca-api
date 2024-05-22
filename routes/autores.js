const express = require("express");
const client = require("../config/database");

const router = express.Router();

router.post("/create", async (request, response, next) => {
  try {
    const { id, nome, nacionalidade, data_nascimento } = request.body;

    const query = {
      text: 'INSERT INTO "Autores" (id, nome, nacionalidade, data_nascimento) VALUES ($1, $2, $3, $4);',
      values: [id, nome, nacionalidade, data_nascimento],
    };
    const autores = await client.query(query);

    console.log(autores);

    response.json({ success: true, autores: autores });
  } catch (error) {
    console.log(error);

    response.status(200).json({ error });
  }
});

router.get("/getAutores", async (request, response, next) => {
  const autores = await client.query('SELECT * FROM "Autores"');

  response.status(200).json({ success: true, autores: autores.rows });
});

router.get("/getAutor/:id", async (request, response, next) => {
  const autor_id = request.params.id;

  const autores = await client.query({
    text: 'SELECT * FROM "Autores" WHERE id = $1 LIMIT 1',
    values: [autor_id],
  });

  if (!autores.rows[0])
    return response.status(401).send("Autor não encontrado");

  response.status(200).json({ success: true, autores: autores.rows });
});

router.delete("/delete/:id", async (request, response, next) => {
    const id = request.params.id

    // id é valido / é um numero inteiro
    if(!id) {
        return response.status(400).send("ID Inválido.")
    }

    // se o autor tem livros publicados
    const livros_autor = await client.query({
        text: 'SELECT * FROM "Livros" WHERE autor_id = $1',
        values: [id]
    })

    if(livros_autor.rows.length > 0) {
        return response.status(404).send("O autor tem livros publicados, exclua os livros antes.")
    }

    await client.query({
        text: 'DELETE FROM "Autores" WHERE id = $1',
        values: [id]
    }).catch((error) => {
        console.log(error)

        return response.status(400).json({ error })
    })

    response.status(200).send('O Autor foi deletado')
});

module.exports = router;
