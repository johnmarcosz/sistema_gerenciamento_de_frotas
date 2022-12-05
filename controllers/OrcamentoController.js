const Orcamento = require('../models/Orcamento')


const { Op } = require('sequelize')

module.exports = class OrcamentoController {

  //metodo para listar orcamentos
  static mostrarOrcamentos(req, res) {

    // order resultados, novos registros primeiro
    let ordenar = 'DESC'

    Orcamento.findAll({
      order: [['createdAt', ordenar]],
      limit: 1000,
    })
      .then((data) => {
        let qtd = data.length
        if (qtd === 0) {
          qtd = false
        }

        const resultado = data.map((result) => result.get({ plain: true }))

        res.render('orcamento/listar', { resultado, qtd })
      })
      .catch((err) => console.log(err))
  }
  //metodo para chamar roda de cadastro orcamento
  static calcularOrcamento(req, res) {
    res.render('orcamento/criar')
  }

  static verResultado(req, res) {
    res.render('orcamento/resultado')
  }

  //metodo para pegar dados do formulario e inserir orcamento no banco
  static calcularOrcamentoPost(req, res) {
    console.log(req.body)
    var orcamento = {
      valor: parseFloat(req.body.valor),
      valorKm: parseFloat(req.body.valorKm),
      distanciaKm: parseFloat(req.body.distanciaKm),
      consumo: parseFloat(req.body.consumo),
      precoCombustivel: parseFloat(req.body.precoCombustivel),
      decrementoVeiculo: parseFloat(req.body.decrementoVeiculo),
      lucroValor: parseFloat(req.body.lucroValor),
      lucroPercentual: parseFloat(req.body.lucroPercentual),
      custosExtras: parseFloat(req.body.custosExtras),
      custoFinal: parseFloat(req.body.custoFinal),
      usuarioCriacao: "Douglas"
    }
    var distanciaKm = orcamento.distanciaKm
    var precoCombustivel = orcamento.precoCombustivel
    var consumo = orcamento.consumo
    var custosExtras = orcamento.custosExtras
    var lucroPercentual = orcamento.lucroPercentual
    var decrementoVeiculo = orcamento.decrementoVeiculo

    var percentualDecremento = decrementoVeiculo / 100
    var custoCombustivel = (distanciaKm / consumo) * precoCombustivel
    var custoFinal = (custoCombustivel * percentualDecremento) + custoCombustivel + custosExtras

    var lucroPercentual = (orcamento.lucroPercentual / 100)


    const valorLucro = custoFinal * lucroPercentual
    const valorFinal = custoFinal + valorLucro
    const valorKmRodado = valorFinal / distanciaKm

    orcamento.custoFinal = custoFinal
    orcamento.valor = valorFinal
    orcamento.lucroValor = valorLucro
    orcamento.valorKm = valorKmRodado

    // const resultado = {
    //   valorFinal: valorFinal,
    //   valorLucro: valorLucro,
    //   valorKmRodado: valorKmRodado,
    //   custoFinal: custoFinal
    // }

    // const id = req.params.id
      
    res.render('orcamento/resultado', {orcamento})
  }

  //metodo para chamar rota ediçao orcamento
  static visualizarOrcamento(req, res) {
    const id = req.params.id
    Orcamento.findOne({ where: { id: id }, raw: true })
      .then((orcamento) => {  
        res.render('orcamento/visualizar', { orcamento })
      })
      .catch((err) => console.log(err))
  }


   //rota para excluir orcamento
   static removerOrcamento(req, res) {
    const id = req.body.id
    Orcamento.destroy({ where: { id: id } })
     .then(() => {
     res.redirect('/orcamento')
     })
     .catch((err) => console.log(err))
     }
   
  static salvarOrcamentoPost(req, res) {
    console.log(req.body)
    var orcamento = {
      valor: req.body.valor,
      valorKm: req.body.valorKm,
      distanciaKm: req.body.distanciaKm,
      consumo: req.body.consumo,
      precoCombustivel: req.body.precoCombustivel,
      decrementoVeiculo: req.body.decrementoVeiculo,
      lucroValor: req.body.lucroValor,
      lucroPercentual: req.body.lucroPercentual,
      custosExtras: req.body.custosExtras,
      custoFinal: req.body.custoFinal,
      usuarioCriacao: "Douglas"
    }

    Orcamento.create(orcamento)
      .then(
        res.redirect('/orcamento/')
      )

  }
}
