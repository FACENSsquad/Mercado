// BANCO
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');

const uri = 'mongodb://127.0.0.1:27017/LINEUP';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

//select collection
app.get('/produtos', async (req, res) => {
  try {
    await client.connect();

    const database = client.db('LINEUP');
    const collection = database.collection('Produtos');
    const documents = await collection.find().toArray();

    res.json(documents);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao recuperar os dados');
  } finally {
    await client.close();
  }
});

//insert data
app.post('/cadastrar', async (req, res) => {
  try {
    const data = req.body;

    await client.connect();

    const database = client.db('LINEUP');
    const collection = database.collection('Produtos');
    const result = await collection.insertOne(data);

    res.status(201).send('Produto cadastrado com sucesso');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao cadastrar o produto');
  } finally {
    await client.close();
  }
});


app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});
