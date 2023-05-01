const mongoose = require('mongoose'); //Mongoose é uma biblioteca do Node.js que facilita a interação com bancos de dados MongoDB. Ele fornece um conjunto de ferramentas para modelagem de dados, validação, consultas e gerenciamento de relacionamentos, tornando o processo de interação com o MongoDB mais simples e intuitivo.

const connectDB = async () =>{

    try{

        const connect = await mongoose.connect('mongodb://localhost:27017/LINEUP', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('conexão com o mongoDB...');
        console.log(`Hostname: ${connect.connection.host}`);

    }catch(err){
        console.log(err);
    }

}

module.exports = connectDB;