const { DataTypes } = require("sequelize")

const bancoDeDados = require("../banco_de_dados/conexaoBD")

const Cliente = bancoDeDados.define("Cliente", {

    tipo:{
        type: DataTypes.CHAR,
        allowNull: false
    },
    
    nomeRazaoSocial:{
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
    
    telefone:{
        type: DataTypes.STRING(11), 
        allowNull: false
    },

    usuarioCriacao:{
        type: DataTypes.STRING(20),
        allowNull: false
    }
})

module.exports = Cliente
