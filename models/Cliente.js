const { DataTypes } = require("sequelize")

const bancoDeDados = require("../banco_de_dados/conexaoBD")

const Cliente = bancoDeDados.define("Cliente", {

    teste:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }

})

module.exports = Cliente