const { DataTypes } = require("sequelize")

const bancoDeDados = require("../banco_de_dados/conexaoBD")

const Viagem = require("../models/Viagem")
const Veiculo = require("../models/Veiculo")

const Viagem_Veiculos = bancoDeDados.define("Viagem_Veiculos", {

})

Viagem_Veiculos.belongsTo(Viagem)
Viagem.hasMany(Viagem_Veiculos)

Viagem_Veiculos.belongsTo(Veiculo)
Veiculo.hasMany(Viagem_Veiculos)

module.exports = Viagem_Veiculos