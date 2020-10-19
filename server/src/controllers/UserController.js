const { findAll, update } = require('../models/User');
const User = require('../models/User');
const { generateHash } = require('../service/passwordService')

module.exports = {

  async store(req, res) {
    // separa a senha do body para poder gerar o hash
    const { senha, ...new_user } = req.body
    // gera o hash da senha
    const hash = await generateHash(senha)
    // adicionar ao objeto new_user o hash gerado
    new_user.senha = hash

    try {
      await User.create(new_user).then(user => {
        res.status(201).json({ success: true, user })
      }).catch(() => {
        res.status(400).json({
          success: false,
          message: 'Ocorreu um erro enquanto os dados eram inseridos.'
        })
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Ocorreu um erro desconhecido com o sistema.'
      })
    }

  },

  async index(req, res) {
    try {
      await User.findAll().then(users => {
        res.status(200).json({ success: true, users })
      }).catch(() => {
        res.status(400).json({
            success: false,
            message: 'Ocorreu um erro enquanto os dados eram recuperados.'
        })
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Ocorreu um erro desconhecido com o sistema.'
      })
    }
  },

  async find(req, res) {
    // pega o id passado na url
    const { id } = req.params

    try {
      await User.findOne({ where: { id }}).then(user => {
        res.status(200).json({ success: true, user })
      }).catch(() => {
        res.status(400).json({
            success: false,
            message: 'Ocorreu um erro enquanto os dados eram recuperados.'
        })
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Ocorreu um erro desconhecido com o sistema.'
      })
    }
  },

  async update(req, res) {
    // pega o id passado na url
    const { id } = req.params
    // tras os parametros do body para o objeto user_update
    const { ...user_update } = req.body

    try {
      await User.update(user_update, { where: { id } }).then(rows_count => {
        User.findOne({ where: { id }}).then(user => {
          res.status(200).json({ success: true, user })
        }).catch(() => {
          res.status(400).json({
              success: false,
              message: 'Ocorreu um erro enquanto os dados eram recuperados.'
          })
        })
      }).catch(() => {
        res.status(400).json({
            success: false,
            message: 'Ocorreu um erro enquanto os dados eram atualizados.'
        })
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Ocorreu um erro desconhecido com o sistema.'
      })
    }
  },

  async delete(req, res) {
    // pega o id passado na url
    const { id } = req.params

    try {
      await User.findOne({ where: { id } }).then(user => {
        user.destroy().then(user2 => {
          res.status(200).json({
            success: true,
            message: 'Registro removido com sucesso.'
          })
        }).catch(() => {
          res.status(400).json({
            success: false,
            message: 'Ocorreu um erro enquanto os dados eram removidos.'
          })
        })
      }).catch(() => {
        res.status(400).json({
          success: false,
          message: 'Ocorreu um erro enquanto os dados eram recuperados.'
        })
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Ocorreu um erro desconhecido com o sistema.'
      })
    }
  }

};