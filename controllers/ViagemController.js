const Viagem = require('../models/Viagem')
const Veiculo = require('../models/Veiculo')

const { Op } = require('sequelize')
const banco_de_dados = require("../banco_de_dados/conexaoBD");
const Viagem_Motoristas = require('../models/Viagem_Motoristas');


module.exports = class ViagemController {

    // --------------------------------------------------------------------------
    // FUNÇÃO PARA MOSTRAR VIAGENS
    // --------------------------------------------------------------------------
    static mostrarViagens(req, res) {

        // Ordenar os resultados (novos registros primeiro)
        let ordenar = 'DESC'

        Viagem.findAll({

            order: [['createdAt', ordenar]], // ordernar pela coluna 'createdAt'
            limit: 1000,                     // limite de 1000 resultados

        }).then((data) => {

            let quantidade = data.length
            if (quantidade === 0) {         // verificando se não retornou nenhum resultado
                quantidade = false
            }

            const resultado = data.map((result) => result.get({ plain: true }))

            for (var index in resultado) {
                resultado[index].dataPartida = resultado[index].dataPartida.toLocaleDateString('pt-BR')
                resultado[index].dataRetorno = resultado[index].dataRetorno.toLocaleDateString('pt-BR')

                if(resultado[index].dataPartida == 'Invalid Date'){
                    resultado[index].dataPartida = "Não informado"
                }
                if(resultado[index].dataRetorno == 'Invalid Date'){
                    resultado[index].dataRetorno = "Não informado"
                }

            }

            res.render('viagem/listar', { resultado, quantidade })

        })
            .catch((err) => console.log(err))
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA REDIRECIONAR PARA A PÁGINA DE CRIAR VIAGEM
    // --------------------------------------------------------------------------
    static criarViagem(req, res) {
        res.render('viagem/criar')
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA CRIAR VIAGEM
    // --------------------------------------------------------------------------
    static async criarViagemPost(req, res) {

        const viagem = {
            valorTotal: req.body.valorTotal,
            origem: req.body.origem,
            destino: req.body.destino,
            VeiculoId: req.body.postIdVeiculo,
            dataPartida: req.body.dataPartida,
            dataRetorno: req.body.dataRetorno,
            usuarioCriacao: "john"
        }

        // Transformando os IDs em lista
        const idsMotoristas = req.body.postIdMotoristas.split(",")

        const viagemCriada = await Viagem.create(viagem)

        var lista_viagem_motoristas = []

        // Criando os registros viagem_motoristas
        idsMotoristas.forEach(async function(idMotorista){

            var viagem_motoristas = {
                MotoristaId: idMotorista,
                ViagemId: viagemCriada.id
            }
            
            const viagem_motorista_criado = await Viagem_Motoristas.create(viagem_motoristas)
            lista_viagem_motoristas.push(viagem_motorista_criado)

        })

        // Se der tudo certo salva a viagem
        await viagemCriada.save().then(() => {

            console.log("Viagem criada com sucesso!")

            lista_viagem_motoristas.forEach(function(viagem_motorista_criado){

                viagem_motorista_criado.save()
                .then(() => {
                    console.log("viagem_motorista criado com sucesso!")
                })
                .catch((err) => {
                    console.log("Erro ao criar viagem_motorista: " + err)
                    viagem_motorista_criado.destroy()
                    viagemCriada.destroy()
                })
            })

        })
        .catch((err) => {
            console.log("Erro ao criar viagem: " + err)

            viagemCriada.destroy()
            lista_viagem_motoristas.forEach(function(viagem_motorista_criado){
                viagem_motorista_criado.destroy()
            })

        })

        res.redirect('/viagem/')
        
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA REDIRECIONAR PARA A PÁGINA DE EDITAR VIAGEM
    // --------------------------------------------------------------------------
    static async editarViagem(req, res) {

        const id = req.params.id

        Viagem.findOne({ where: { id: id }, raw: true })
            .then(async (viagem) => {

                var veiculo = await Veiculo.findOne({
                    where: {
                       id: viagem.VeiculoId
                    }
                })

                var motoristas = await Viagem_Motoristas.findAll({
                    where: {
                      ViagemId: viagem.id
                    }
                })
                
                res.render('viagem/editar', { viagem : viagem, veiculo : veiculo, motoristas : motoristas })
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

    // --------------------------------------------------------------------------
    // FUNÇÃO PARA BUSCAR VEÍCULOS
    // --------------------------------------------------------------------------
    static buscarVeiculo(req, res) {

        var texto_busca = req.query.texto_busca
        var query = `
        SELECT id, descricao, placa FROM veiculos
        WHERE descricao LIKE '%${texto_busca}%'
        OR placa LIKE '%${texto_busca}%'
        LIMIT 10
        `
        banco_de_dados.query(query, { type: banco_de_dados.QueryTypes.SELECT})
            .then(function(dados, erro){

                if(erro) {
                    console.log(erro)
                } else {
                    res.json(dados)
                }
        })
    }

    // --------------------------------------------------------------------------
    // FUNÇÃO PARA BUSCAR MOTORISTAS
    // --------------------------------------------------------------------------
    static buscarMotorista(req, res) {

        var texto_busca = req.query.texto_busca
        var query = `
        SELECT id, nome, cpf FROM motorista
        WHERE nome LIKE '%${texto_busca}%'
        OR cpf LIKE '%${texto_busca}%'
        LIMIT 10
        `
        banco_de_dados.query(query, { type: banco_de_dados.QueryTypes.SELECT})
            .then(function(dados, erro){

                if(erro) {
                    console.log(erro)
                } else {
                    res.json(dados)
                }
        })
    }
}
