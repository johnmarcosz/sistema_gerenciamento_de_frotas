module.exports.verificaSessao = function (req, res, next) {
    const userId = req.session.userid
    const username = req.session.username
    if (!userId) {
    res.redirect('/login')
    }
    next()
    console.log(username)
    }