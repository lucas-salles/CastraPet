const Castration = require("../database/models/Castration");
const { Op } = require("sequelize");
const { get_new_castration } = require("../service/utilService");

module.exports = {

  async update(req, res, next){

    const { id } = req.params;
    const { pet_id } = req.body;

    try {
      await Castration.update({ pet_id: pet_id }, { where: { id } }).then(response => {
        Castration.findByPk(id).then(castration => {
          res.status(200).json({ success: true, castration });
        }).catch(err_find => {
          res.status(400).json({
            success: false,
            message: 'Ocorreu um erro enquanto os dados eram recuperados.'
          });
        });
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

  async reserve(req, res, next) {
    const { data, periodo_castracao } = req.body

    try {
      await Castration.findAll({ 
        where: { 
          data: { 
            [Op.gt]: `${data} 00:00:00`,
            [Op.lt]: `${data} 23:59:59`
          },
          periodo_castracao
        },
        order: [
          ["atendimento", "ASC"]
        ]
      }).then(response => {
        if (response.length < 10) {
          let new_castration = get_new_castration(periodo_castracao, data, response)

          Castration.create(new_castration).then(castration => {
            res.status(200).json({ success: true, castration });
          }).catch(err_create => {
            res.status(400).json({
              success: false,
              message: "Ocorreu um erro enquanto os dados eram inseridos."
            })
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Não tem mais vagas."
          })
        }
      }).catch(err_count => {
        res.status(400).json({
          success: false,
          message: "Ocorreu um erro ao contabilizar os registros."
        })
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
      await Castration.findByPk(id).then(castration => {
        castration.destroy().then(castration2 => {
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

}