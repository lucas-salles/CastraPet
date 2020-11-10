const Vaccination = require('../database/models/Vaccination');

module.exports = {

  async index(req, res, next) {
    try {
      await Vaccination.findAll().then(vaccinations => {
        return res.status(200).json({ success: true, vaccinations });
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
    const { ...new_vaccination } = req.body;

    try {
      await Vaccination.create(new_vaccination).then(vaccination => {
        return res.status(201).json({ success: true, vaccination });
      }).catch(err => {
        res.status(400).json({
          success: false,
          message: 'Ocorreu um erro enquanto os dados eram inseridos.'
        });
      });
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
      await Vaccination.findByPk(id).then(vaccination => {
        if(!vaccination) {
          res.status(404).json({ 
            success: false, 
            message: 'A vacinação não foi encontrada no sistema.' 
          });
        }
        res.status(200).json({ success: true, vaccination });
      }).catch(() => {
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

  async update(req, res, next) {
    const { id } = req.params;
    const { ...vaccination_up } = req.body;

    try {
      await Vaccination.update(vaccination_up, { where: { id } } ).then(rows_count => {
        Vaccination.findByPk(id).then(vaccination => {
          res.status(200).json({ success: true, vaccination });
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
      });
    }
  },

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      await Vaccination.findByPk(id).then(vaccination_find => {
        vaccination_find.destroy().then(vaccination_del => {
          res.status(200).json({
            success: true,
            message: 'Registro removido com sucesso.'
          });
        }).catch(() => {
          res.status(400).json({
            success: false,
            message: 'Ocorreu um erro enquanto os dados eram removidos.'
          });
        })
      }).catch(() => {
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

  async findWithPets(req, res, next) {
    const { id } = req.params

    try {
      await Vaccination.findByPk(id, { include: { association: 'pets' } }).then(vaccination => {
        if(!vaccination) {
          res.status(404).json({ 
            success: false, 
            message: 'A vacinação não foi encontrada no sistema.' 
          });
        }
        res.status(200).json({ success: true, vaccination });
      }).catch(() => {
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

};
