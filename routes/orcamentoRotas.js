const express = require("express");
const router = express.Router();
const OrcamentoController = require("../controllers/OrcamentoController");
const verificaSessao = require("../models/sessao").verificaSessao;

//rotas para os metodos
router.get("/",verificaSessao, OrcamentoController.mostrarOrcamentos);
router.get("/criar",verificaSessao, OrcamentoController.calcularOrcamento);
router.post("/resultado",verificaSessao, OrcamentoController.calcularOrcamentoPost);
router.get("/visualizar/:id",verificaSessao, OrcamentoController.visualizarOrcamento);
router.post("/remover",verificaSessao, OrcamentoController.removerOrcamento);
router.get("/resultado",verificaSessao, OrcamentoController.verResultado)
router.post("/salvarPost",verificaSessao, OrcamentoController.salvarOrcamentoPost);


module.exports = router;
