const { DataTypes } = require("sequelize")

const bancoDeDados = require("../banco_de_dados/conexaoBD")

const Pessoa = bancoDeDados.define("Pessoa", {

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

    numeroCNH:{
        type: DataTypes.STRING(11),
        allowNull: true
    },

    validadeCNH:{
        type: DataTypes.DATE,
        allowNull: true
    },

    categoriaCNH:{
        type: DataTypes.STRING(2),
        allowNull: true
    }
})

module.exports = Pessoa