const Pet = require('../database/models/Pet');

module.exports = {

  async index(req, res, next) {
    try {
      await Pet.findAll({ include: { association: 'tutor' } }).then(pets => {
        return res.status(200).json({ success: true, pets });
      }).catch(err => {
        res.status(400).json({
          success: false,
          message: 'Ocorreu um erro enquanto os dados eram recuperados.'
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Ocorreu um erro desconhecido com o sistema.'
      });
    }
  },

  async store(req, res, next){

    const { ...new_pet } = req.body;

    try {
      await Pet.create(new_pet).then(pet => {
        return res.status(200).json({ success: true, pet });
      }).catch(err => {
        res.status(400).json({
          success: false,
          message: 'Ocorreu um erro enquanto os dados eram inseridos.'
        });
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Ocorreu um erro desconhecido com o sistema.'
      });
    }
  },

  async find(req, res, next) {
    const { id } = req.params

    try {
      await Pet.findByPk(id, { include: { association: 'tutor' } }).then(pet => {
        if(!pet) {
          return res.status(404).json({ success: false, message: 'O PET não foi encontrado no sistema.' })
        }
        res.status(200).json({ success: true, pet })
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

  async update(req, res, next) {
    const { id } = req.params;
    const { ...pet_update } = req.body;

    try {
      await Pet.update(pet_update, { where: { id } } ).then(rows_count => {
        Pet.findByPk(id).then(pet => {
          res.status(200).json({ success: true, pet });
        }).catch(erro => {
          res.status(400).json({
            success: false,
            message: 'Ocorreu um erro enquanto os dados eram recuperados.'
          });
        });
      }).catch(err => {
        res.status(400).json({
          success: false,
          message: 'Ocorreu um erro enquanto os dados eram atualizados.'
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Ocorreu um erro desconhecido com o sistema.'
      })
    }
  },

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      await Pet.findByPk(id).then(pet => {
        pet.destroy().then(pet2 => {
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
  },

};
