// Comandos para iniciar o projeto e instalar os pacotes
// npm init -y
// npm install express express-handlebars sequelize mysql2 bcryptjs connect-flash cookie-parser cookie-session express-flash express-session session-file-store nodemon

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
//middleware do controle de sessão
aplicacao.use(
  session({
  name: 'session',
  secret: 'nosso_secret',
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
  logFn: function () {},
  path: require('path').join(require('os').tmpdir(), 'sessions'),
  }),
  cookie: {
  secure: false,
  maxAge: 3600000,
  expires: new Date(Date.now() + 3600000),
  httpOnly: true,
  },
  }),
  )
  // flash messages
  aplicacao.use(flash());
  
// Importa os Models para a criação das tabelas
const Usuario = require("./models/Usuario");
const Motorista = require("./models/Motorista"); 
const Pessoa = require("./models/Pessoa");
const Viagem = require("./models/Viagem");
const Veiculo = require("./models/Veiculo");
const Viagem_Veiculos = require("./models/Viagem_Veiculos");
const Orcamento = require("./models/Orcamento");


// importa a verificaSessao
const verificaSessao = require("./models/sessao").verificaSessao;
//Rota inicial da aplicação

aplicacao.get('/',verificaSessao, function (req, res) {
res.render('home')
})
aplicacao.get('/login', function (req, res) {
  res.render('login',{layout:false})
  })
  
//Logout
aplicacao.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/login')
  })





//Rotas dos models
const veiculoRotas = require("./routes/veiculoRotas");
aplicacao.use("/veiculo", veiculoRotas);

const viagemRotas = require("./routes/viagemRotas");
aplicacao.use("/viagem", viagemRotas);

const motoristaRotas = require("./routes/motoristaRotas");
aplicacao.use("/motorista", motoristaRotas);

const usuarioRotas = require("./routes/usuarioRotas.js");
aplicacao.use("/usuario", usuarioRotas);


// Inicia o servidor/aplicação somente depois de conectar ao BD
conexaoBD
  .sync()
  .then(() => {
    console.log("Conectado ao banco!")
    aplicacao.listen(3000);
  })
  .catch((err) => console.log(err)); 