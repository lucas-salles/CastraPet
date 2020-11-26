const Castration = require("../database/models/Castration");
const { Op } = require("sequelize");
const { get_new_castration, get_days_by_month } = require("../service/utilService");
const User = require("../database/models/User");
const { Sequelize } = require("sequelize");

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

  async listByTutor(req, res, next) {
    const { id } = req.params;

    try {
      await Castration.findAll({ 
        include: {
          association: 'pet',
          where: {
            usuario_id: id
          },
          include: {
            association: 'tutor',
            attributes: {
              exclude: ['senha']
            }
          }
        } 
      }).then(castrations => {
        res.status(200).json({ success: true, castrations});
      }).catch(err_find => {
        res.status(400).json({
          success: false,
          message: 'Ocorreu um erro enquanto os dados eram recuperados.'
        });
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Ocorreu um erro desconhecido com o sistema.'
      });
    }
  },

  async list(req, res, next) {
    try {
      await Castration.findAll({
        include: {
          association: 'pet',
          include: {
            association: 'tutor',
          }
        }
      }).then(castrations => {
        res.status(200).json({ success: true, castrations });
      }).catch(err_find => {
        res.status(400).json({
          success: false,
          message: 'Ocorreio um erro enquanto os dados eram recuperados.'
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Ocorreu um erro desconhecido com o sistema.'
      });
    }
  },

  async notAvailable(req, res, next) {
    const { mes } = req.query;

    var datas = [];

    var ano = new Date().getFullYear();
    
    var dias_do_mes = parseInt(new Date(ano, mes, 0).toISOString().substring(8, 10))

    try {
      await Castration.findAll({
        attributes: [
          'data',
          'periodo_castracao',
          [Sequelize.literal(`COUNT(*)`), 'count']
        ],
        where: {
          data: {
            [Op.gt]: `${ano}/${mes}/01 00:00:00`,
            [Op.lt]: `${ano}/${mes}/${dias_do_mes} 23:59:59`
          }
        },
        group: [Sequelize.fn('day', Sequelize.col('data')), 'periodo_castracao'],
        order: ['data']
      }).then(castrations => {
        
        castrations.forEach((value, index) => {
          if ( value.dataValues.count == 10 ) {
            datas.push({
              data: parseInt(value.data.toString().substring(8, 10)),
              periodo_castracao: value.periodo_castracao
            });
          }
        });
        res.status(200).json({ success: true, datas });
      }).catch(find_err => {
        console.log(find_err)
        res.status(400).json({
          success: false,
          message: 'Ocorreio um erro enquanto os dados eram recuperados.'
        });
      });
      
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: 'Ocorreu um erro desconhecido com o sistema.'
      });
    }
  }

}