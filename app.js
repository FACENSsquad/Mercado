// BANCO
const express = require('express');
const connectDB = require('./db');

let porta = 3000;

const app = express();

app.listen(porta, 'localhost', ()=>{
    console.log(`Na porta ${porta}`);

});

connectDB();