const express = require("express");
const router = express.Router();
const MotoristaController = require("../controllers/MotoristaController");

//rotas para os metodos
router.get("/", MotoristaController.mostrarMotoristas);
router.get("/criar", MotoristaController.criarMotorista);
router.post("/criarPost", MotoristaController.criarMotoristaPost);
router.get("/editar/:id", MotoristaController.editarMotorista);
router.post("/editarPost", MotoristaController.editarMotoristaPost);
router.post("/remover", MotoristaController.removerMotorista);


module.exports = router;
