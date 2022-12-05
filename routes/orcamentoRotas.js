const express = require("express");
const router = express.Router();
const OrcamentoController = require("../controllers/OrcamentoController");

//rotas para os metodos
router.get("/", OrcamentoController.mostrarOrcamentos);
router.get("/criar", OrcamentoController.calcularOrcamento);
router.post("/resultado", OrcamentoController.calcularOrcamentoPost);
router.get("/visualizar/:id", OrcamentoController.visualizarOrcamento);
router.post("/remover", OrcamentoController.removerOrcamento);
router.get("/resultado", OrcamentoController.verResultado)
router.post("/salvarPost", OrcamentoController.salvarOrcamentoPost);


module.exports = router;
