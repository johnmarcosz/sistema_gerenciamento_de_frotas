const Viagem = require('../models/Viagem')
const Cliente = require('../models/Cliente')
const Usuario = require('../models/Usuario')
const Veiculo = require('../models/Veiculo')
const Viagem_Veiculos = require('../models/Viagem_Veiculos')

const sequelize = require('sequelize')
const session = require('express-session')

const { Op } = require('sequelize')

module.exports = class ViagemController {

    // --------------------------------------------------------------------------
    // FUNÇÃO PARA MOSTRAR VIAGENS
    // --------------------------------------------------------------------------
    static mostrarViagens(req, res) {

        // Ordenar os resultados (novos registros primeiro)
        let ordenar = 'DESC'

        Viagem.findAll({

            attributes: {
                include: [
                    "id",
                    [sequelize.fn("DATE_FORMAT", sequelize.col("dataRetorno"), "%d/%m/%Y"),
                        "dataRetorno"],
                    [sequelize.fn("DATE_FORMAT", sequelize.col("dataPartida"), "%d/%m/%Y"),
                    "dataPartida"],
                    "origem",
                    "destino",
                    "valorTotal",
                    "ClienteId",
                ],
            },
            include: [{
                model: Cliente,
                required: true
            }],

            order: [['createdAt', ordenar]], // ordernar pela coluna 'createdAt'
            limit: 1000,                     // limite de 1000 resultados

        }).then((data) => {

            let quantidade = data.length
            if (quantidade === 0) {         // verificando se não retornou nenhum resultado
                quantidade = false
            }

            const resultado = data.map((result) => result.get({ plain: true }))
            res.render('viagem/listar', { resultado, quantidade })

        })
            .catch((err) => console.log(err))
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA REDIRECIONAR PARA A PÁGINA DE CRIAR VIAGEM
    // --------------------------------------------------------------------------
    static async criarViagem(req, res) {

        let ordenar = 'ASC'

        Veiculo.findAll({
            order: [['tipo', ordenar]],
            limit: 10,
        })
        .then((data) => {

            const veiculos = data.map((result) => result.get({ plain: true }))
            console.log(veiculos)
            res.render('viagem/criar', { veiculos })

        })
        .catch((err) => console.log(err))

    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA CRIAR VIAGEM
    // --------------------------------------------------------------------------
    static criarViagemPost(req, res) {

        const viagem = {
            valorTotal: req.body.valorTotal,
            origem: req.body.origem,
            destino: req.body.destino,
            dataPartida: req.body.dataPartida,
            dataRetorno: req.body.dataRetorno,
            veiculo: req.body.valorTotal,
            usuarioCriacao: "john"
        }
        
        Viagem.create(viagem)
            .then(() => {
                res.redirect('/viagem/')
            })
            .catch((err) => console.log(err))
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA REDIRECIONAR PARA A PÁGINA DE EDITAR VIAGEM
    // --------------------------------------------------------------------------
    static editarViagem(req, res) {

        const id = req.params.id

        Viagem.findOne({ where: { id: id }, raw: true })
            .then((viagem) => {
                res.render('viagem/editar', { viagem })
            })
            .catch((err) => console.log(err))
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA EDITAR VIAGEM
    // --------------------------------------------------------------------------
    static editarViagemPost(req, res) {

        const id = req.body.id

        const viagem = {
            valorTotal: req.body.valorTotal,
            origem: req.body.origem,
            destino: req.body.destino,
            dataPartida: req.body.dataPartida,
            dataRetorno: req.body.dataRetorno
        }

        Viagem.update(viagem, { where: { id: id } })
            .then(() => {
                res.redirect('/viagem')
            })
            .catch((err) => console.log(err))
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA REMOVER VIAGEM
    // --------------------------------------------------------------------------
    static removerViagem(req, res) {

        const id = req.body.id

        Viagem.destroy({ where: { id: id } })
            .then(() => {
                res.redirect('/viagem')
            })
            .catch((err) => console.log(err))
    }

}
