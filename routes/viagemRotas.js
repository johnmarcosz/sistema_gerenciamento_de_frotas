const express = require("express");
const rota = express.Router();
const ViagemController = require("../controllers/ViagemController");
const verificaSessao = require("../models/sessao").verificaSessao;

rota.get("/",verificaSessao, ViagemController.mostrarViagens);
rota.get("/criar",verificaSessao, ViagemController.criarViagem);
rota.post("/criarPost",verificaSessao, ViagemController.criarViagemPost);
rota.get("/editar/:id",verificaSessao, ViagemController.editarViagem);
rota.post("/editarPost",verificaSessao, ViagemController.editarViagemPost);
rota.post("/remover",verificaSessao, ViagemController.removerViagem);
rota.get("/buscarVeiculo",verificaSessao, ViagemController.buscarVeiculo);
rota.get("/buscarMotorista",verificaSessao, ViagemController.buscarMotorista);

module.exports = rota;
