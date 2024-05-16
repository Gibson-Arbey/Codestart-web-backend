const { Router } = require("express");
const { check } = require("express-validator");
const { registrarResultado } = require("../controllers/resultado.controller");
const { validarCampos, validarJWT} = require("../middlewares");
const router = Router();

router.put(
  "/registrar",
  [
    validarJWT,
    check("usuarioId", "El usuario no es valido.").isMongoId(),
    check("temaId", "El tema no es valido.").isMongoId(),
    check("puntaje", "El puntaje no es valido.").isInt({ min: 0, max: 100 }),
    validarCampos,
  ],
  registrarResultado
);



module.exports = router;
