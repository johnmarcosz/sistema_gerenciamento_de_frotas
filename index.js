const express = require("express");
const expressHandlebars = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

//Instancia o express, handlebars e mid dos formulários
const aplicacao = express();

const conexaoBD = require("./banco_de_dados/conexaoBD");

aplicacao.engine("handlebars", expressHandlebars.engine());
aplicacao.set("view engine", "handlebars");

aplicacao.use(
  express.urlencoded({
    extended: true,
  })
);

aplicacao.use(express.json());

aplicacao.use(express.static('public'))

// Importa os Models para a criação das tabelas
const Usuario = require("./models/Usuario");
const Pessoa = require("./models/Pessoa");
const Viagem = require("./models/Viagem");
const Veiculo = require("./models/Veiculo");
const Viagem_Veiculos = require("./models/Viagem_Veiculos");
const Orcamento = require("./models/Orcamento");


// Rota inicial
aplicacao.get("/", function (requisicao, resposta) {
    resposta.render("home")
})

//Rotas dos models
const veiculoRotas = require("./routes/veiculoRotas");
aplicacao.use("/veiculo", veiculoRotas);

const viagemRotas = require("./routes/viagemRotas");
aplicacao.use("/viagem", viagemRotas);

// Inicia o servidor/aplicação somente depois de conectar ao BD
conexaoBD
  .sync()
  .then(() => {
    aplicacao.listen(3000);
  })
  .catch((err) => console.log(err)); 