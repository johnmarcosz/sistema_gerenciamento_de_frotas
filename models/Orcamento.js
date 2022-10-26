const { DataTypes } = require("sequelize")


const bancoDeDados = require("../banco_de_dados/conexaoBD")

const Cliente = require("../models/Cliente")

const Orcamento = bancoDeDados.define("Orcamento", {

    valor:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    distanciaKm:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    consumo:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    precoCombustivel:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    
    decrementoVeiculo:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    lucroValor:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    lucroPercentual:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    comissaoPercentual:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },

    comissaoValor:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },

    custosExtras:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },

    usuarioCriacao:{
        type: DataTypes.STRING(20),
        allowNull: false
    },

    ultimoAcesso:{
        type: DataTypes.DATE,
        allowNull: true
    }

})

Orcamento.belongsTo(Cliente)
Cliente.hasOne(Orcamento)

module.exports = Orcamento