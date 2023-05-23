import { Router } from "express";
import userControler from "../controller/userController";
import produtosControler from "../controller/produtosController";

const rotas = Router();


// ----------------- ROTAS DA API ----------------

rotas.get('/produtos', produtosControler.find);
rotas.post('/produtos', produtosControler.create);

rotas.get('/user', userControler.find);
rotas.post('/user', userControler.create);

rotas.get('/', (req, res) => {
    res.sendFile(__dirname +'/html/index.html');
})

export default rotas;