const User = require("../database/models/User");
const { generateHash, compareHash } = require("../service/passwordService");

module.exports = {
  autenticacao: (req, res, next) => {
    const { email, senha } = req.body

    User.findOne({ where: { email } }).then(user => {
      if (user) {
        if (compareHash(user.senha, senha)) {
          const { senha, ...usuario } = user.dataValues
          req.body.usuario = usuario
          next()
        } else {
          return res.status(401).json({ message: "Senha incorreta!"})
        }
      } else {
        return res.status(404).json({ message: "E-mail não encontrado!"})
      }
    })
  }
}