const Veiculo = require('../models/Veiculo')

const { Op } = require('sequelize')

module.exports = class VeiculoController {

    // --------------------------------------------------------------------------
    // FUNÇÃO PARA MOSTRAR VEÍCULOS
    // --------------------------------------------------------------------------
    static mostrarVeiculos(req, res) {

        // Ordenar os resultados (novos registros primeiro)
        let ordenar = 'DESC'

        Veiculo.findAll({

            order: [['createdAt', ordenar]], // ordernar pela coluna 'createdAt'
            limit: 1000,                     // limite de 1000 resultados

        }).then((data) => {

            let quantidade = data.length
            if (quantidade === 0) {         // verificando se não retornou nenhum resultado
                quantidade = false
            }

            const resultado = data.map((result) => result.get({ plain: true }))

            for(var index in resultado){
                resultado[index].validadeCsv =  resultado[index].validadeCsv.toLocaleDateString('pt-BR')
                resultado[index].validadeLit =  resultado[index].validadeLit.toLocaleDateString('pt-BR')
            }

            res.render('veiculo/listar', { resultado, quantidade })

        })
            .catch((err) => console.log(err))
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA REDIRECIONAR PARA A PÁGINA DE CRIAR VEÍCULO
    // --------------------------------------------------------------------------
    static criarVeiculo(req, res) {
        res.render('veiculo/criar')
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA CRIAR VEÍCULO
    // --------------------------------------------------------------------------
    static criarVeiculoPost(req, res) {

        const veiculo = {
            placa: req.body.placa,
            tipo: req.body.tipo,
            numeroRenavam: req.body.numeroRenavam,
            validadeCsv: req.body.validadeCsv,
            validadeLit: req.body.validadeLit,
            capacidadePassageiros: req.body.capacidadePassageiros,
            ano: req.body.ano,
            usuarioCriacao: "john"
        }

        Veiculo.create(veiculo)
            .then(() => {
                res.redirect('/veiculo/')
            })
            .catch((err) => console.log(err))
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA REDIRECIONAR PARA A PÁGINA DE EDITAR VEÍCULO
    // --------------------------------------------------------------------------
    static editarVeiculo(req, res) {

        const id = req.params.id

        Veiculo.findOne({ where: { id: id }, raw: true })
            .then((veiculo) => {
                veiculo.validadeCsv = veiculo.validadeCsv.toLocaleDateString('en-CA')
                veiculo.validadeLit = veiculo.validadeLit.toLocaleDateString('en-CA')
                res.render('veiculo/editar', { veiculo })
            })
            .catch((err) => console.log(err))
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA EDITAR VEÍCULO
    // --------------------------------------------------------------------------
    static editarVeiculoPost(req, res) {

        const id = req.body.id

        const veiculo = {
            placa: req.body.placa,
            tipo: req.body.tipo,
            numeroRenavam: req.body.numeroRenavam,
            validadeCsv: req.body.validadeCsv,
            validadeLit: req.body.validadeLit,
            capacidadePassageiros: req.body.capacidadePassageiros,
            ano: req.body.ano
        }

        Veiculo.update(veiculo, { where: { id: id } })
            .then(() => {
                res.redirect('/veiculo')
            })
            .catch((err) => console.log(err))
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA REMOVER VEÍCULO
    // --------------------------------------------------------------------------
    static removerVeiculo(req, res) {

        const id = req.body.id

        Veiculo.destroy({ where: { id: id } })
            .then(() => {
                res.redirect('/veiculo')
            })
            .catch((err) => console.log(err))
    }

}
