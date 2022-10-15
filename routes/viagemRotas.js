const express = require("express");
const rota = express.Router();
const ViagemController = require("../controllers/ViagemController");

rota.get("/", ViagemController.mostrarViagens);
rota.get("/criar", ViagemController.criarViagem);
rota.post("/criarPost", ViagemController.criarViagemPost);
rota.get("/editar/:id", ViagemController.editarViagem);
rota.post("/editarPost", ViagemController.editarViagemPost);
rota.post("/remover", ViagemController.removerViagem);


module.exports = rota;
