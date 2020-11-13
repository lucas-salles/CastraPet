const { decode } = require("../service/tokenService")

module.exports = {
  async is_server(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ 
        success: false,
        message: "Nenhum token fornecido." 
      });
    }

    try {
      const user = await decode(token);
      console.log(token)
      if (user.tipo_usuario === "SERVIDOR") {
        next()
      } else {
        return res.status(401).json({
          success: false,
          message: "Usuário não tem permissão para acessar esta rota."
        })
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Ocorreu um erro desconhecido com o sistema.",
      });
    }
  },

  async is_user(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ 
        success: false,
        message: "Nenhum token fornecido." 
      });
    }

    try {
      const user = await decode(token);
      if (user.tipo_usuario === "USUARIO" || user.tipo_usuario === "SERVIDOR") {
        next()
      } else {
        return res.status(401).json({
          success: false,
          message: "Usuário não tem permissão para acessar esta rota."
        })
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Ocorreu um erro desconhecido com o sistema.",
      });
    }
  },

}