const { DataTypes } = require("sequelize")

const bancoDeDados = require("../banco_de_dados/conexaoBD")

const Motorista = bancoDeDados.define("Motorista", {

    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING(14),
        allowNull: false
    },
    numeroCNH:{
        type: DataTypes.STRING(11),
        allowNull: true
    },
    dataAdmissao: {
        type: DataTypes.DATE,
        allowNull: true
    },
    validadeCNH:{
        type: DataTypes.DATE,
        allowNull: true
    },
    categoriaCNH:{
        type: DataTypes.STRING(2),
        allowNull: true
    },
    usuarioCriacao: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
})

module.exports = Motorista
