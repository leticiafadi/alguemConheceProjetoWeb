const sqlite3 = require('sqlite3').verbose();
var express = require('express');
var router = express.Router();
var db = require('../database');
const Prestador = require("../models/Prestador");
const Servico = require("../models/Servico");

// Listar serviços
router.get('/', function (req, res, next) {
    res.status(200);
    Prestador.all((list) => {
        res.json(list)
    });
});

// Buscar serviço pelo id
router.get('/:id', function (req, res, next) {
    Prestador.findById(req.params.id, (prestador) => {
        res.status(prestador.getId() ? 200 : 404);
        res.json(prestador.getId() ? prestador : {});
    })
});
//Buscar serviços de um determinado prestador
router.get('/:id/servicos', function (req, res, next) {
    Prestador.findById(req.params.id, (prestador) => {
        res.status(prestador.getId() ? 200 : 404);
        prestador.servicos((servicos) => {
            res.json(servicos);
        })
    })
});


router.get('/:id/servicos/:sid', function (req, res, next) {
    Servico.findById(req.params.sid, (servico) => {
        let status = !servico.getId()
            ? 404
            : (servico.prestador_id == req.params.id) ? 200 : 403;

        console.log(servico, req.params.id);
        if (status === 200) {
            res.json(servico);
        } else {
            res.json({});
        }
    })
});


module.exports = router;