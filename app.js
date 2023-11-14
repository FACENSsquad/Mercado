// BANCO
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');


const uri = 'mongodb://127.0.0.1:27017/LINEUP';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());//configurar o middleware express.json()

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
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'asset/img/prod/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/cadastrar', upload.single('imagem'),async (req, res) => {
  try {
    const data = req.body;
    const imagemPath = req.file.path; // Caminho da imagem salva no servidor

    await client.connect();

    const database = client.db('LINEUP');
    const colslection = database.collection('Produtos');
    const result = await collection.insertOne({ ...data, imagem: imagemPath });

    res.status(201).send('Produto cadastrado com sucesso');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao cadastrar o produto');
  } finally {
    await client.close();
  }
});

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


const stripe = require('stripe')('sk_test_51NxdPaEXjLJ1bWfNYaaM7fN84hfGZfFQ9lO0ImqkXQ4Nnay7NlaJ7fuuSjhLjVemsU2PW1NOLVq0CIPpstuHy2I500yy9XAASy');

app.post('/processarPagamento', async (req, res) => {
  try {
    const { items } = req.body;
    
    const lineItems = items.map(item => {
      return {
        price_data: {
          currency: item.currency,
          product_data: {
            name: item.name,
          },
          unit_amount: item.amount,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems, // Corrigindo a atribuição de line_items
      mode: 'payment',
      success_url: `http://localhost:3000/success.html`,
      cancel_url: `http://127.0.0.1:5500/src/html/carrinho.html`,
    });

    res.json({ url: session.url });
  } 
  catch (e) {
    res.status(500).json({ error: e.message });
  }
});



app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});
