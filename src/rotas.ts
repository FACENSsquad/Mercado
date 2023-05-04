import { Router } from "express";
import userControler from "../controller/userControler";

const rotas = Router();

rotas.get('/users', userControler.find);
rotas.post('/user', userControler.create);

rotas.get('/', (req, res) => {
    res.sendFile(__dirname +'/html/index.html');
})

export default rotas;