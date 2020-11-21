const express = require('express');
const router = express.Router();
const fs = require('fs');

const getTogosJogos = () => {
    try {
        const jogosDataFile = fs.readFileSync('data/lista_jogos.json');
        return JSON.parse(jogosDataFile);
    } catch (e) {
        res.status(500).json({ erro: `Erro ao ler lista de jogos` });
    }
}

const getInfoJogos = () => {
    try {
        const jogosInfoDataFile = fs.readFileSync('data/info_jogos.json');
        return JSON.parse(jogosInfoDataFile);
    } catch (e) {
        res.status(500).json({ erro: `Erro ao ler informações do jogo` });
    }
}

const getJogoById = async (req, res, next) => {
    try {
        const jogoLista = getTogosJogos().find(jogoItem => +jogoItem.id === +req.params.id);
        const jogo = {
            ...jogoLista,
            ...getInfoJogos().find(jogoItem => +jogoItem.id === +req.params.id)
        };

        if(jogo.id == null) {
            res.status(404).json({ erro: `Jogo com id ${req.params.id} não encontrado` });
        } else {
            req.jogo = jogo;
            next();
        }

    } catch (e) {
        res.status(500).json({ erro: `O id ${req.params.id} não é válido` });
    }
};

const getDestaque = () => {
    return getTogosJogos().find(jogo => jogo.destaque === true);
}

const getListagemJogos = () => {
    return getTogosJogos().filter(jogo => jogo.destaque !== true);
}

router.get('/', async (req, res) => {
    res.json(getListagemJogos());
});

router.get('/destaque', async (req, res) => {
    res.json(getDestaque());
});

router.get('/:id', getJogoById, (req, res) => {
    res.json(req.jogo);
});

module.exports = router;
