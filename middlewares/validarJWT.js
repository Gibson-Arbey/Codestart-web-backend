const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      type: "error",
      msg: "No hay token en la petición",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        type: "error",
        msg: "Token no válido - usuario no existe",
      });
    }

    if (usuario) {
      req.usuario = {
        ...usuario._doc,
      };
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      type: "error",
      msg: "Token no válido",
    });
  }
};

module.exports = { validarJWT };
