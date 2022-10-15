const { DataTypes } = require("sequelize")

const bancoDeDados = require("../banco_de_dados/conexaoBD")

const Usuario = require("../models/Usuario")
<<<<<<< HEAD
//const Pessoa = require("../models/Pessoa")
const Motorista = require("../models/Motorista")

const Viagem = bancoDeDados.define("Viagem", {

    valorTotal:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

=======
const Pessoa = require("../models/Pessoa")

const Viagem = bancoDeDados.define("Viagem", {

>>>>>>> b7d7a42705fdeda09bfc14f192421052262ae57c
    origem:{
        type: DataTypes.STRING,
        allowNull: false
    },

<<<<<<< HEAD
    dataPartida:{
        type: DataTypes.DATE,
        allowNull: false
=======
    destino:{
        type: DataTypes.STRING,
        allowNull: false
    },

    dataPartida:{
        type: DataTypes.DATE,
        allowNull: true
>>>>>>> b7d7a42705fdeda09bfc14f192421052262ae57c
    },

    dataRetorno:{
        type: DataTypes.DATE,
<<<<<<< HEAD
        allowNull: false
    }
=======
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

>>>>>>> b7d7a42705fdeda09bfc14f192421052262ae57c
}, {
    freezeTableName: true // o sequelize coloca um 's' automático no final do nome das tables, esse comando impede isso pra não ficar "Viagems"
})
 
Viagem.belongsTo(Usuario)
Usuario.hasMany(Viagem)

<<<<<<< HEAD
Viagem.belongsTo(Motorista)
Motorista.hasMany(Viagem)
=======
Viagem.belongsTo(Pessoa)
Pessoa.hasMany(Viagem)
>>>>>>> b7d7a42705fdeda09bfc14f192421052262ae57c

module.exports = Viagem