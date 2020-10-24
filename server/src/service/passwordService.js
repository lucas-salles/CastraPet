const CryptoJS = require('crypto-js');

const secret_key = process.env.HASH_KEY || 'secreta'

module.exports = {

  generateHash(senha) {
    return CryptoJS.HmacMD5(senha, secret_key).toString()
  },

  compareHash(hash, senha) {
    const senhaToHash = CryptoJS.HmacMD5(senha, secret_key).toString()
    if (senhaToHash === hash) {
      return true
    } else {
      return false
    }
  }
}