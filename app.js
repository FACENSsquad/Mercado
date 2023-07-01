// BANCO
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');

const uri = 'mongodb://127.0.0.1:27017/LINEUP';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());//configurar o middleware express.json()

//select collection PRODUTOS
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

//select collection BANNER
app.get('/banner', async (req, res) => {
  try {
    await client.connect();

    const database = client.db('LINEUP');
    const collection = database.collection('banner');
    const documents = await collection.find().toArray();

    res.json(documents);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao recuperar os dados');
  } finally {
    await client.close();
  }
});
// ------------------------- insert data -------------------------
// </IMAGEM>
const multer = require('multer');

// Configuração do multer para salvar os arquivos na pasta 'prod'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'asset/img/prod/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
// </IMAGEM>

//rota cafastro
app.post('/cadastrar', upload.single('imagem'),async (req, res) => {
  try {
    const data = req.body;
    const imagemPath = req.file.path; // Caminho da imagem salva no servidor

    await client.connect();

    const database = client.db('LINEUP');
    const collection = database.collection('Produtos');
    const result = await collection.insertOne({ ...data, imagem: imagemPath });

    res.status(201).send('Produto cadastrado com sucesso');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao cadastrar o produto');
  } finally {
    await client.close();
  }
});

//rota pedidos
app.post('/pedidos', async (req, res) => {
  try {
    const data = req.body;

    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();

    const database = client.db('LINEUP');
    const collection = database.collection('Pedidos');
    const result = await collection.insertOne(data);

    client.close();

    res.status(201).send('Produto cadastrado com sucesso');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao cadastrar o produto');
  }
});


app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});
