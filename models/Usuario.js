const { DataTypes } = require("sequelize")


const bancoDeDados = require("../banco_de_dados/conexaoBD")


const Usuario = bancoDeDados.define("Usuario", {

    username:{
        type: DataTypes.STRING(20),
        allowNull: false
    },

    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },

    email:{
        type: DataTypes.STRING,
        allowNull: true
    },

    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },

    sobrenome:{
        type: DataTypes.STRING,
        allowNull: true
    },

    usuarioCriacao:{
        type: DataTypes.STRING(20),
        allowNull: true
    },

    ultimoAcesso:{
        type: DataTypes.DATE,
        allowNull: true
    }

})

module.exports = Usuario