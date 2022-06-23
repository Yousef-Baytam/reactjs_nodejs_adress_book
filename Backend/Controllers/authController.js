const User = require('../Models/user')

module.exports.register = async (req, res, next) => {
    const user = new User(req.body)
    await User.register(user, req.body.password)
    next()
}

module.exports.registerResponse = (req, res) => {
    res.send({ 'response': 'success' })
}

module.exports.login = (req, res) => {
    res.send({ 'response': 'success' })
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => { return next(err) })
    res.send({ 'response': 'success' })
}

module.exports.me = (req, res) => {
    res.send({ 'user': req.user })
}