const { DataTypes } = require("sequelize")

const bancoDeDados = require("../banco_de_dados/conexaoBD")

const Cliente = bancoDeDados.define("Cliente", {

    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },

    nomeFantasia:{
        type: DataTypes.STRING,
        allowNull: true
    },

    cpfCnpj:{
        type: DataTypes.STRING(14),
        allowNull: false
    },

    tipoPessoa:{
        type: DataTypes.CHAR,
        allowNull: false
    },

    usuarioCriacao:{
        type: DataTypes.STRING(20),
        allowNull: false
    }

})

module.exports = Cliente