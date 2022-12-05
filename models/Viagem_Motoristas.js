const { DataTypes } = require("sequelize")

const bancoDeDados = require("../banco_de_dados/conexaoBD")

const Viagem = require("../models/Viagem")
const Motorista = require("../models/Motorista")

const Viagem_Motoristas = bancoDeDados.define("Viagem_Motoristas", {

})

Viagem_Motoristas.belongsTo(Viagem)
Viagem.hasMany(Viagem_Motoristas)

Viagem_Motoristas.belongsTo(Motorista, {as: 'Motorista'})

module.exports = Viagem_Motoristas