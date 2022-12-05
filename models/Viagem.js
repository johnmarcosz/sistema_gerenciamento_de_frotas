const { DataTypes } = require("sequelize")

const bancoDeDados = require("../banco_de_dados/conexaoBD")

const Cliente = require("../models/Cliente")
const Motorista = require("../models/Motorista")

const Viagem = bancoDeDados.define("Viagem", {

    origem:{
        type: DataTypes.STRING,
        allowNull: false
    },

    destino:{
        type: DataTypes.STRING,
        allowNull: false
    },

    dataPartida:{
        type: DataTypes.DATE,
        allowNull: true
    },

    dataRetorno:{
        type: DataTypes.DATE,
        allowNull: true
    },

    valorTotal:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    usuarioCriacao:{
        type: DataTypes.STRING(20),
        allowNull: false
    }

}, {
    freezeTableName: true // o sequelize coloca um 's' automático no final do nome das tables, esse comando impede isso pra não ficar "Viagems"
})

Viagem.belongsTo(Cliente)
Cliente.hasMany(Viagem)

Viagem.belongsTo(Motorista, {as: 'Motorista'})

module.exports = Viagem
