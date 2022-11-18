

const express = require('express');




const { uuid } = require('uuidv4');
// Precisamos iniciar o express, por ele ser uma função.
const app = express();

app.use(express.json());





// Aqui definimos a porta que ficaremos ouvindo no nosso servidor e retornamos uma mensagem.
app.listen(3333, () => {
  console.log("Servidor funcionando!!!")
})