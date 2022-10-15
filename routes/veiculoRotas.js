const express = require("express");
const rota = express.Router();
const VeiculoController = require("../controllers/VeiculoController");

rota.get("/", VeiculoController.mostrarVeiculos);
rota.get("/criar", VeiculoController.criarVeiculo);
rota.post("/criarPost", VeiculoController.criarVeiculoPost);
rota.get("/editar/:id", VeiculoController.editarVeiculo);
rota.post("/editarPost", VeiculoController.editarVeiculoPost);
rota.post("/remover", VeiculoController.removerVeiculo);


module.exports = rota;
