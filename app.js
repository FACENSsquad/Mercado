// BANCO
const express = require('express');
const connectDB = require('./db');

let porta = 4000;

const app = express();

app.listen(porta, 'localhost', ()=>{
    console.log(`Na porta ${porta}`);

});

connectDB();