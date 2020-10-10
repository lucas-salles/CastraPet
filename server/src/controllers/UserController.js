const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { 
      nome,
      bairro,
      telefone,
      cep,
      documento,
      tipo,
      email,
      senha
    } = req.body;

    const user = await User.create({ 
      nome,
      bairro,
      telefone,
      cep,
      documento,
      tipo,
      email,
      senha 
    })

    return res.json(user);
  }
};