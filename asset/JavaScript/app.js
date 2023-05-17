// BANCO
const {MongoClient} = require ('mongodb');
const uri = "mongodb://localhost:27017/LINEUP/";

const client = new MongoClient(uri);
async function run(){
    try{
        await client.connect()
        console.log("Conectado com sucesso");
    }catch(err){
        console.log(err);
    }
}
run()
module.exports = client; 