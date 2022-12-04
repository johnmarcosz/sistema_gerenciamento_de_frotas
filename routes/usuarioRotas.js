const express = require("express");
const rota = express.Router();

const UsuarioController = require("../controllers/UsuarioController");
// importa a verificaSessao
const verificaSessao = require("../models/sessao").verificaSessao;
rota.get("/",verificaSessao, UsuarioController.mostrarUsuarios);
rota.get("/criar",verificaSessao, UsuarioController.criarUsuario);
rota.post("/criarPost",verificaSessao, UsuarioController.criarUsuarioPost);
rota.get("/editar/:id",verificaSessao, UsuarioController.editarUsuario);

//rota.post("/editarPost",verificaSessao, UsuarioController.editarUsuarioPost);

rota.post("/remover",verificaSessao, UsuarioController.removerUsuario);

rota.get("/",verificaSessao, UsuarioController.mostrarUsuarios);
rota.get("/criar",verificaSessao, UsuarioController.criarUsuario);
rota.post("/criarPost",verificaSessao, UsuarioController.criarUsuarioPost);
rota.get("/editar/:id",verificaSessao, UsuarioController.editarUsuario);
rota.post("/editarPost",verificaSessao, UsuarioController.editarUsuaroPost);
rota.post("/remover",verificaSessao, UsuarioController.removerUsuario);
rota.post("/loginPost",verificaSessao, UsuarioController.loginPost);



module.exports = rota;
