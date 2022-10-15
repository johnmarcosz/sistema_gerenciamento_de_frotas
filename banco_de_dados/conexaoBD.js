const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('gerenciamento_de_frotas_bd',
    'admin', // usuário
    'admin', // senha
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql'
    }
)

try {
    sequelize.authenticate()
    console.log("Conectado com o banco de dados.")
} catch (erro) {
    console.erro("Não foi possível conectar com o banco de dados. ", erro)
}

module.exports = sequelize