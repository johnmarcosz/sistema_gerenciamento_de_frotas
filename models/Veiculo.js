const { DataTypes } = require("sequelize")

const bancoDeDados = require("../banco_de_dados/conexaoBD")

const Veiculo = bancoDeDados.define("Veiculo", {

    placa:{
        type: DataTypes.STRING(7),
        allowNull: false
    },

    descricao:{
        type: DataTypes.STRING(150),
        allowNull: false
    },

    tipo:{
        type: DataTypes.STRING(80),
        allowNull: false
    },

    numeroRenavam:{
        type: DataTypes.STRING(11),
        allowNull: false
    },

    validadeCsv:{
        type: DataTypes.DATE,
        allowNull: false
    },

    validadeLit:{
        type: DataTypes.DATE,
        allowNull: false
    },

    capacidadePassageiros:{
        type: DataTypes.INTEGER,
        allowNull: true
    },

    ano:{
        type: DataTypes.INTEGER,
        allowNull: true
    },

    usuarioCriacao:{
        type: DataTypes.STRING(20),
        allowNull: false
    }

})

module.exports = Veiculo
