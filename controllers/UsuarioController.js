const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')

const { Op } = require('sequelize')

module.exports = class UsuarioController {

    // --------------------------------------------------------------------------
    // FUNÇÃO PARA MOSTRAR Usuario
    // --------------------------------------------------------------------------
    static mostrarUsuarios(req, res) {

        // Ordenar os resultados (novos registros primeiro)
        let ordenar = 'DESC'

        Usuario.findAll({

            order: [['createdAt', ordenar]], // ordernar pela coluna 'createdAt'
            limit: 1000,                     // limite de 1000 resultados

        }).then((data) => {

            let quantidade = data.length
            if (quantidade === 0) {         // verificando se não retornou nenhum resultado
                quantidade = false
            }

            const resultado = data.map((result) => result.get({ plain: true }))
            res.render('usuario/listar', { resultado, quantidade })

        })
            .catch((err) => console.log(err))
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA REDIRECIONAR PARA A PÁGINA DE CRIAR Usuario
    // --------------------------------------------------------------------------
    static criarUsuario(req, res) {
        res.render('usuario/criar')
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA CRIAR Usuario
    // --------------------------------------------------------------------------
    static criarUsuarioPost(req, res) {
        const salt = bcrypt.genSaltSync(10)
        const hashSenha = bcrypt.hashSync(req.body.senha, salt)

        const usuario = {
            //Cria o hash
            username: req.body.username,
            senha: hashSenha, //Usa o hash para cadastrar no bd            email: req.body.email,
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email : req.body.email
        }

        console.log(usuario)
        Usuario.create(usuario)
            .then(() => {
                res.redirect('/usuario/')
            })
            .catch((err) => console.log(err))
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA REDIRECIONAR PARA A PÁGINA DE EDITAR Usuario
    // --------------------------------------------------------------------------
    static editarUsuario(req, res) {

        const id = req.params.id

        Usuario.findOne({ where: { id: id }, raw: true })
            .then((usuario) => {
                res.render('usuario/editar', { usuario })
                console.log(usuario)

            })
            .catch((err) => console.log(err))
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA EDITAR Usuario
    // --------------------------------------------------------------------------
    static editarUsuaroPost(req, res) {
        const id = req.body.id
        const salt = bcrypt.genSaltSync(10)
        const hashSenha = bcrypt.hashSync(req.body.senha, salt) //cria o hash

        const usuario = {
            username: req.body.username,
            senha: hashSenha,
            email: req.body.email,
            nome: req.body.nome,
            sobrenome: req.body.sobrenome

        }

        Usuario.update(usuario, { where: { id: id } })
            .then(() => {
                res.redirect('/usuario')
            })
            .catch((err) => console.log(err))
    }


    // --------------------------------------------------------------------------
    // FUNÇÃO PARA REMOVER Usuario
    // --------------------------------------------------------------------------
    static removerUsuario(req, res) {

        const id = req.body.id

        Usuario.destroy({ where: { id: id } })
            .then(() => {
                res.redirect('/usuario')
            })
            .catch((err) => console.log(err))
    }

    static async loginPost(req, res) {
        const username = req.body.username
        const senha = req.body.senha
        // localiza o usuario
        const usuario = await Usuario.findOne({ where: { username: username } })
        if (!usuario) {
        res.render('login', {
        mensagem: 'Usuário não encontrado!',layout:false,
        })
        return
        }
        // compara a senha
        const senhaCorreta = bcrypt.compareSync(senha, usuario.senha)
        if (!senhaCorreta) {
        res.render('login', {
        mensagem: 'Senha inválida!',layout:false,
        })
        return
        }
        // cria sessão do usuário
        req.session.userid = usuario.id
        req.session.save(() => {
        res.redirect('/')
        })
        }

}
