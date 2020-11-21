const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/jogos', require('./controller/ListagemJogosController'));

app.listen(5000, () => {
    console.log('Servidor rodando em http://localhost:5000/')
});
