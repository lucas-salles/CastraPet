const Castration = require("../database/models/Castration");
const { Op } = require("sequelize");

const define_hour = (periodo_castracao, quant) => {
  var result = ""
  switch (quant) {
    case 0:
      result = periodo_castracao == "manhã" ? "08:00:00" : "13:00:00"
      break;
    case 1:
      result = periodo_castracao == "manhã" ? "08:20:00" : "13:20:00"
      break;
    case 2:
      result = periodo_castracao == "manhã" ? "08:40:00" : "13:40:00"
      break;
    case 3:
      result = periodo_castracao == "manhã" ? "09:00:00" : "14:00:00"
      break;
    case 4:
      result = periodo_castracao == "manhã" ? "09:20:00" : "14:20:00"
      break;
    case 5:
      result = periodo_castracao == "manhã" ? "09:40:00" : "14:40:00"
      break;
    case 6:
      result = periodo_castracao == "manhã" ? "10:00:00" : "15:00:00"
      break;
    case 7:
      result = periodo_castracao == "manhã" ? "10:20:00" : "15:20:00"
      break;
    case 8:
      result = periodo_castracao == "manhã" ? "10:40:00" : "15:40:00"
      break;
    case 9:
      result = periodo_castracao == "manhã" ? "11:00:00" : "16:00:00"
      break;
  }
  return result;
}

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
        console.log(err)
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
      await Castration.findAndCountAll({ 
        where: { 
          data: { 
            [Op.gt]: `${data} 00:00:00`,
            [Op.lt]: `${data} 23:59:59`
          },
          periodo_castracao
        } 
      }).then(response => {
        console.log(response.count)
        if (response.count < 10) {
          let horario = define_hour(periodo_castracao, response.count)

          Castration.create({ 
            data: `${data} ${horario}`, 
            periodo_castracao 
          }).then(castration => {
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
  }
}