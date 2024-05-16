const validarCampos = require("./validar-campo");
const validarJWT = require("./validarJWT")

module.exports = {
  ...validarCampos,
  ...validarJWT
};
