import { Router } from "express";
import userControler from "../controller/userController";
import produtosControler from "../controller/produtosController";
import produtos from "./database/produtos";
import produtosController from "../controller/produtosController";

const rotas = Router();


// ----------------- ROTAS DA API ----------------

rotas.get('/produtos', produtosControler.find);
rotas.post('/produtos', produtosControler.create);

rotas.get('/user', userControler.find);
rotas.post('/user', userControler.create);

rotas.get('/', (req, res) => {
    res.sendFile(__dirname +'/html/index.html');
})


//---------------- READ Leitura de Dados ------------------

rotas.get('/produtos', async (req, res) => {

    try {
    
        const produto = await produtos.find();

        res.status(200).json(produto);

    } catch (error) {
        res.status(500).json({error: error});
    }

})




export default rotas;