const { Router } = require("express");
const { check } = require("express-validator");
const { guardarUsuario } = require("../controllers/usuario.controller");
const { validarCampos } = require("../middlewares");
const router = Router();

router.post(
  "/registro",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("contrasena", "La contraseña es obligatoria").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  guardarUsuario
);

module.exports = router;
