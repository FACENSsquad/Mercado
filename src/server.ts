const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'lineup';

MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  console.log('Conectado com sucesso ao servidor MongoDB');

  const db = client.db(dbName);

  // aqui você pode realizar as operações do banco de dados, como consultar ou inserir dados

  client.close();
});







import express from 'express';  //Esta linha importa o módulo Express do pacote 'express'. O módulo Express fornece as ferramentas necessárias para criar aplicativos e servidores HTTP.
import mongoose from 'mongoose';   
import rotas from './rotas';
 

const app = express();        //Esta linha cria um novo objeto de aplicativo do Express. O objeto do aplicativo é a base para qualquer aplicativo Express e é usado para configurar rotas e outras funcionalidades.

mongoose.connect('mongodb://localhost/LineUp');

app.use(express.json());

app.use(rotas);


app.listen(3000, () => {
    console.log('Server is listening on port 3000');     //Esta linha configura o servidor HTTP para escutar na porta 3000. 
    
});