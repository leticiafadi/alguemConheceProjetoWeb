const sqlite3 = require('sqlite3').verbose();
var express = require('express');
var router = express.Router();
var db = require('../database');
const Servico = require("../models/Servico");


router.get('/', function(req, res, next) {
  res.status(200);
  Servico.all((list) => {
    res.json(list)
  });
});

router.get('/:id', function (req, res, next) {
  Servico.findById(req.params.id, (servico) => {
    res.status(servico.getId() ? 200 : 404);
    res.json(servico.getId() ? servico : {});
  })
});


router.get('/:id/servicos', function (req, res, next) {
  Servico.findById(req.params.id, (servico) => {
    res.status(servico.getId() ? 200 : 404);
    servico.servicos((servicos) => {
      res.json(servicos);
    })
  })
});

router.post('/servicos', (req, res, next) => {
  Servico.parseValuesToQuery();
  Servico.make(req);
  Servico.save();
  res.status(Servico.getId() ? 200 : 500);
});

router.put('/servico/id', function (req, res, next) {
  Servico.findById(req.params.id, (servico) => {
    res.status(servico.getId() ? 200 : 404);
    servico.servicos((servicos) => {
      Servico.fresh();
      res.json(servicos);
    })
  })
});

router.delete('/servico/id', function (req, res, next) {
  // 
});

module.exports = router;
