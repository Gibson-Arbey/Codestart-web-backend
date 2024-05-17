const { Router } = require("express");
const { check } = require("express-validator");
const { guardarUsuario, login } = require("../controllers/usuario.controller");
const { validarCampos } = require("../middlewares");
const router = Router();

router.post(
  "/registro",
  [
    check("correo", "El correo no es valido").isEmail(),
    check("contrasena", "La contraseña es obligatoria").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  guardarUsuario
);

router.post(
  "/login",
  [
    check("correo", "El correo no es valido").isEmail(),
    check("contrasena", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
