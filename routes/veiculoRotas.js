const express = require("express");
const rota = express.Router();
const VeiculoController = require("../controllers/VeiculoController");
const verificaSessao = require("../models/sessao").verificaSessao;


rota.get("/",verificaSessao,VeiculoController.mostrarVeiculos);
rota.get("/criar", verificaSessao, VeiculoController.criarVeiculo);
rota.post("/criarPost",verificaSessao, VeiculoController.criarVeiculoPost);
rota.get("/editar/:id",verificaSessao, VeiculoController.editarVeiculo);
rota.post("/editarPost",verificaSessao,VeiculoController.editarVeiculoPost);
rota.post("/remover", verificaSessao,VeiculoController.removerVeiculo);


module.exports = rota;
