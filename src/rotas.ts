import { Router } from "express";
import userControler from "../controller/userControler";

const rotas = Router();

rotas.get('/users', userControler.find);
rotas.post('/user', userControler.create);


rotas.post('/home',(req, res) => {
    res.sendFile(__dirname +'index.html');
});


export default rotas;