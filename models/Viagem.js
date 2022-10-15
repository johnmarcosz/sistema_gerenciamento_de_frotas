const { DataTypes } = require("sequelize")

const bancoDeDados = require("../banco_de_dados/conexaoBD")

const Usuario = require("../models/Usuario")
//const Pessoa = require("../models/Pessoa")
const Motorista = require("../models/Motorista")

const Viagem = bancoDeDados.define("Viagem", {

    valorTotal:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    origem:{
        type: DataTypes.STRING,
        allowNull: false
    },

    dataPartida:{
        type: DataTypes.DATE,
        allowNull: false
    },

    dataRetorno:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    freezeTableName: true // o sequelize coloca um 's' automático no final do nome das tables, esse comando impede isso pra não ficar "Viagems"
})
 
Viagem.belongsTo(Usuario)
Usuario.hasMany(Viagem)

Viagem.belongsTo(Motorista)
Motorista.hasMany(Viagem)

module.exports = Viagem