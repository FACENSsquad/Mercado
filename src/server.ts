import express from 'express';  //Esta linha importa o módulo Express do pacote 'express'. O módulo Express fornece as ferramentas necessárias para criar aplicativos e servidores HTTP.
import mongoose from 'mongoose';   
import rotas from './rotas';
import path from 'path';
 

const app = express();        //Esta linha cria um novo objeto de aplicativo do Express. O objeto do aplicativo é a base para qualquer aplicativo Express e é usado para configurar rotas e outras funcionalidades.

mongoose.connect('mongodb://localhost/ecommerce');

app.use(express.json());

app.use(rotas);

app.get('/',(req, res) => {

    const indexPath = path.join(__dirname, 'Mercado', 'index.html');
    res.sendFile(indexPath);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');     //Esta linha configura o servidor HTTP para escutar na porta 3000. 
    
});