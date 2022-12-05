const Cliente = require('../models/Cliente')


const { Op } = require('sequelize')

module.exports = class ClienteController {

    //metodo para listar clientes
    static mostrarClientes(req, res) {

        // order resultados, novos registros primeiro
        let ordenar = 'DESC'

        Cliente.findAll({
            order: [['createdAt', ordenar]],
            limit: 1000,
        })
            .then((data) => {
                let qtd = data.length
                if (qtd === 0) {
                    qtd = false
                }

                const resultado = data.map((result) => result.get({ plain: true }))

                res.render('cliente/listar', { resultado, qtd })
            })
            .catch((err) => console.log(err))
    }
    //metodo para chamar roda de cadastro cliente
    static criarCliente(req, res) {
        res.render('cliente/criar')
    }

    //metodo para pegar dados do formulario e inserir cliente no banco
    static criarClientePost(req, res) {
        console.log(req.body)
        const cliente = {
            tipo: req.body.tipo,
            nomeRazaoSocial: req.body.nomeRazaoSocial,
            nomeFantasia: req.body.nomeFantasia,
            cpfCnpj: req.body.cpfCnpj,
            telefone: req.body.telefone,
            email: req.body.email,
            usuarioCriacao: "Douglas"
        }
        Cliente.create(cliente)
            .then(() => {
                res.redirect('/cliente/')
            })
            .catch((err) => console.log(err))
    }

    //metodo para chamar rota ediçao cliente
    static editarCliente(req, res) {
        const id = req.params.id
        Cliente.findOne({ where: { id: id }, raw: true })
            .then((cliente) => {
                res.render('cliente/editar', { cliente })
            })
            .catch((err) => console.log(err))
    }

    //metodo para editar cliente via psot
    static editarClientePost(req, res) {
        const id = req.body.id
        const cliente = {
            tipo: req.body.tipo,
            nomeRazaoSocial: req.body.nomeRazaoSocial,
            nomeFantasia: req.body.nomeFantasia,
            cpfCnpj: req.body.cpfCnpj,
            telefone: req.body.telefone,
            email: req.body.email,
            usuarioCriacao: "Douglas"
        }
        Cliente.update(cliente, { where: { id: id } })
            .then(() => {
                res.redirect('/cliente')
            })
            .catch((err) => console.log(err))
    }

    //rota para excluir cliente
    static removerCliente(req, res) {
        const id = req.body.id
        Cliente.destroy({ where: { id: id } })
            .then(() => {
                res.redirect('/cliente')
            })
            .catch((err) => console.log(err))
    }

}
