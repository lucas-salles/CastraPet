const User = require("../database/models/User");
const { generateHash } = require("../service/passwordService");
const tokenService = require("../service/tokenService");

module.exports = {
  async store(req, res, next) {
    // separa a senha do body para poder gerar o hash
    const { senha, ...new_user } = req.body;
    // gera o hash da senha
    const hash = await generateHash(senha);
    // adicionar ao objeto new_user o hash gerado
    new_user.senha = hash;

    try {
      await User.create(new_user)
        .then((user) => {
          const { senha, ...user_response } = user.dataValues;

          res.status(201).json({ success: true, user: user_response });
        })
        .catch((error) => {
          if (error.name === "SequelizeUniqueConstraintError") {
            res.status(400).json({
              success: false,
              message: "Este e-mail já foi cadastrado no sistema",
            });
          } else {
            res.status(400).json({
              success: false,
              message: "Ocorreu um erro enquanto os dados eram inseridos.",
            });
          }
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Ocorreu um erro desconhecido com o sistema.",
      });
    }
  },

  async index(req, res, next) {
    try {
      await User.findAll({
        attributes: {
          exclude: ["senha"],
        },
        include: {
          association: "pets",
        },
      })
        .then((users) => {
          res.status(200).json({ success: true, users });
        })
        .catch(() => {
          res.status(400).json({
            success: false,
            message: "Ocorreu um erro enquanto os dados eram recuperados.",
          });
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Ocorreu um erro desconhecido com o sistema.",
      });
    }
  },

  async find(req, res, next) {
    // pega o id passado na url
    const { id } = req.params;

    try {
      await User.findByPk(id, {
        attributes: {
          exclude: ["senha"],
        },
        include: { association: "pets" },
      })
        .then((user) => {
          res.status(200).json({ success: true, user });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Ocorreu um erro enquanto os dados eram recuperados.",
          });
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Ocorreu um erro desconhecido com o sistema.",
      });
    }
  },

  async update(req, res, next) {
    // pega o id passado na url
    const { id } = req.params;
    // tras os parametros do body para o objeto user_update
    const { ...user_update } = req.body;

    try {
      await User.update(user_update, { where: { id } })
        .then((rows_count) => {
          User.findByPk(id, {
            attributes: {
              exclude: ["senha"],
            },
          })
            .then((user) => {
              res.status(200).json({ success: true, user });
            })
            .catch(() => {
              res.status(400).json({
                success: false,
                message: "Ocorreu um erro enquanto os dados eram recuperados.",
              });
            });
        })
        .catch(() => {
          res.status(400).json({
            success: false,
            message: "Ocorreu um erro enquanto os dados eram atualizados.",
          });
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Ocorreu um erro desconhecido com o sistema.",
      });
    }
  },

  async delete(req, res, next) {
    // pega o id passado na url
    const { id } = req.params;

    try {
      await User.findByPk(id)
        .then((user) => {
          user
            .destroy()
            .then((user2) => {
              res.status(200).json({
                success: true,
                message: "Registro removido com sucesso.",
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({
                success: false,
                message: "Ocorreu um erro enquanto os dados eram removidos.",
              });
            });
        })
        .catch(() => {
          res.status(400).json({
            success: false,
            message: "Ocorreu um erro enquanto os dados eram recuperados.",
          });
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Ocorreu um erro desconhecido com o sistema.",
      });
    }
  },

  async login(req, res, next) {
    try {
      const { usuario } = req.body;
      const token = await tokenService.encode(
        usuario.id,
        usuario.nome,
        usuario.tipo
      );
      res.status(200).json({ usuario, token: token });
    } catch (error) {
      res.status(500).json({
        error: error,
        success: false,
        message: "Ocorreu um erro desconhecido com o sistema.",
      });
      next(error);
    }
  },

  async tokenValidate(req, res, next) {
    const token = req.headers.authorization;

    if (!token)
      return response.status(400).json({ error: "Nenhum token fornecido." });

    try {
      const user = await tokenService.decode(token);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({
        error: error,
        success: false,
        message: "Ocorreu um erro desconhecido com o sistema.",
      });
      next(error);
    }
  },
};
