const CryptoJS = require('crypto-js');

const secret_key = process.env.HASH_KEY || 'senha secreta'

module.exports = {

  async generateHash(senha) {
    return CryptoJS.HmacMD5(senha, secret_key).toString()
  },

  async compareHash(hash, senha) {
    var nomeHash = CryptoJS.HmacMD5(nome, secret_key).toString()
    if (nomeHash === hash) {
      return true
    } else {
      return false
    }
  }
}