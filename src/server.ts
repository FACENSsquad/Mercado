import express from 'express';  //Esta linha importa o módulo Express do pacote 'express'. O módulo Express fornece as ferramentas necessárias para criar aplicativos e servidores HTTP.

const app = express();        //Esta linha cria um novo objeto de aplicativo do Express. O objeto do aplicativo é a base para qualquer aplicativo Express e é usado para configurar rotas e outras funcionalidades.


app.use(express.json());

app.get('/',(req, res) => {
    res.sendFile(__dirname +'index.html');
});





app.listen(3000, () => {
    console.log('Server is listening on port 3000');     //Esta linha configura o servidor HTTP para escutar na porta 3000. 
    
});