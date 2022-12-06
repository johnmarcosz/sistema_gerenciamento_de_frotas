const express = require("express");
const router = express.Router();
const MotoristaController = require("../controllers/MotoristaController");
const verificaSessao = require("../models/sessao").verificaSessao;

//rotas para os metodos
router.get("/",verificaSessao, MotoristaController.mostrarMotoristas);
router.get("/criar",verificaSessao, MotoristaController.criarMotorista);
router.post("/criarPost",verificaSessao, MotoristaController.criarMotoristaPost);
router.get("/editar/:id",verificaSessao,  MotoristaController.editarMotorista);
router.post("/editarPost",verificaSessao, MotoristaController.editarMotoristaPost);
router.post("/remover",verificaSessao, MotoristaController.removerMotorista);


module.exports = router;
