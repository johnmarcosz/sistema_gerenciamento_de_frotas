const Motorista = require('../models/Motorista')


const { Op } = require('sequelize')

module.exports = class MotoristaController {

  //metodo para listar motoristas
  static mostrarMotoristas(req, res) {

    // order resultados, novos registros primeiro
    let ordenar = 'DESC'

    Motorista.findAll({
      order: [['createdAt', ordenar]],
      limit: 1000,
    })
      .then((data) => {
        let qtd = data.length
        if (qtd === 0) {
          qtd = false
        }

        const resultado = data.map((result) => result.get({ plain: true }))
        for (var index in resultado) {
          resultado[index].validadeCNH = resultado[index].validadeCNH.toLocaleDateString('pt-BR')
          resultado[index].numeroCNH = resultado[index].numeroCNH.toString()

        }

        res.render('motorista/listar', { resultado, qtd })
      })
      .catch((err) => console.log(err))
  }
  //metodo para chamar roda de cadastro motorista
  static criarMotorista(req, res) {
    res.render('motorista/criar')
  }

  //metodo para pegar dados do formulario e inserir motorista no banco
  static criarMotoristaPost(req, res) {
    console.log(req.body)
    const motorista = {
      nome: req.body.nome,
      cpf: req.body.cpf,
      numeroCNH: req.body.numeroCNH,
      validadeCNH: req.body.validadeCNH,
      categoriaCNH: req.body.categoriaCNH,
      usuarioCriacao: "Douglas"
    }
    Motorista.create(motorista)
      .then(() => {
        res.redirect('/motorista/')
      })
      .catch((err) => console.log(err))
  }

  //metodo para chamar rota ediçao motorista
  static editarMotorista(req, res) {
    const id = req.params.id
    Motorista.findOne({ where: { id: id }, raw: true })
      .then((motorista) => {
          motorista.validadeCNH = motorista.validadeCNH.toLocaleDateString('en-CA')
        
        res.render('motorista/editar', { motorista })
      })
      .catch((err) => console.log(err))
  }

  //metodo para editar motorista via psot
  static editarMotoristaPost(req, res) {
    const id = req.body.id
    const motorista = {
      nome: req.body.nome,
      cpf: req.body.cpf,
      numeroCNH: req.body.numeroCNH,
      validadeCNH: req.body.validadeCNH,
      categoriaCNH: req.body.categoriaCNH,
      usuarioCriacao: "Douglas"
    }
    Motorista.update(motorista, { where: { id: id } })
      .then(() => {
        res.redirect('/motorista')
      })
      .catch((err) => console.log(err))
  }

   //rota para excluir motorista
   static removerMotorista(req, res) {
    const id = req.body.id
    Motorista.destroy({ where: { id: id } })
     .then(() => {
     res.redirect('/motorista')
     })
     .catch((err) => console.log(err))
     }
     
}
