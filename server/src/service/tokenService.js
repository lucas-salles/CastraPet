const jwt = require('jsonwebtoken');
const User = require('../database/models/User');

// Senha para criptografia do token
const tokenKey = process.env.TOKEN_KEY || 'tokenKey';

function checkToken(token) {
    try {
        const { id } = jwt.decode(token)
        return User.findOne({ where: { id } }).then(user => {
            if (user) {
                const { id, nome, tipo } = user
                const token = jwt.sign({ id, nome, tipo }, tokenKey, { expiresIn: '1d' })
                return { token, tipo }
            } else {
                return false
            }
        })
    } catch (error) {
        return false
    }
}

module.exports = {

    async encode(id, nome, tipo) {
        const token = jwt.sign({ id, nome, tipo }, tokenKey, { expiresIn: '1d' })
        return token
    },

    async verifyToken(token) {
      checkToken(token)
    },

    async decode(token) {
        try {
            const { id } = jwt.verify(token, tokenKey)
            return User.findOne({ 
              where: { id }, 
              attributes: { 
                exclude: ['senha']
              }
            })
        } catch (error) {
            return checkToken(token)
        }
    }

}