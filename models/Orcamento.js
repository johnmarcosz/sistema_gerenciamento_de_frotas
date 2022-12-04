const { DataTypes } = require("sequelize")

const bancoDeDados = require("../banco_de_dados/conexaoBD")

const Orcamento = bancoDeDados.define("Orcamento", {

    valor:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    valorKm:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    distanciaKm:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },

    consumo:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },

    precoCombustivel:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    
    decrementoVeiculo:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },

    lucroValor:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },

    lucroPercentual:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },

    custosExtras:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    custoFinal:{
        type: DataTypes.DECIMAL(10,2),
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

module.exports = Orcamento;