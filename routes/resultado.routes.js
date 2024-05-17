const { Router } = require("express");
const { check } = require("express-validator");
const {
  registrarResultado,
  listarResultadosByTemaAndUsuario,
} = require("../controllers/resultado.controller");
const { validarCampos, validarJWT } = require("../middlewares");
const router = Router();

router.put(
  "/registrar",
  [
    validarJWT,
    check("usuarioId", "El id del usuario no es valido.").isMongoId(),
    check("temaId", "El id del tema no es valido.").isMongoId(),
    check("puntaje", "El puntaje no es valido.").isInt({ min: 0, max: 100 }),
    validarCampos,
  ],
  registrarResultado
);

router.get("/", [
  validarJWT,
    check("usuarioId", "El id del usuario no es valido.").isMongoId(),
    check("temaId", "El id del tema no es valido.").isMongoId(),
    validarCampos,
], listarResultadosByTemaAndUsuario);

module.exports = router;
