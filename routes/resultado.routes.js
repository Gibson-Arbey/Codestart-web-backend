const { Router } = require("express");
const { check } = require("express-validator");
const {
  registrarResultado,
  obtenerResultadoByTemaAndUsuario,
  listarResultadosByUsuario,
  listarResultadosByTema,
  obtenerUltimoResultado
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

router.get(
  "/",
  [
    validarJWT,
    check("usuarioId", "El id del usuario no es valido.").isMongoId(),
    check("temaId", "El id del tema no es valido.").isMongoId(),
    validarCampos,
  ],
  obtenerResultadoByTemaAndUsuario
);

router.get(
  "/:usuarioId",
  [
    validarJWT,
    check("usuarioId", "El id del usuario no es valido.").isMongoId(),
    validarCampos,
  ],
  listarResultadosByUsuario
);

router.get(
  "/tema/:temaId",
  [
    validarJWT,
    check("temaId", "El id del tema no es valido.").isMongoId(),
    validarCampos,
  ],
  listarResultadosByTema
);

router.get(
  "/ultimo/:usuarioId",
  [
    validarJWT,
    check("usuarioId", "El id del usuario no es valido.").isMongoId(),
    validarCampos,
  ],
  obtenerUltimoResultado
);

module.exports = router;
