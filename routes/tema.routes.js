const { Router } = require("express");
const { listarTemas } = require("../controllers/tema.controller");
const { validarCampos, validarJWT} = require("../middlewares");
const router = Router();

router.get(
  "/",
  [
    validarJWT,
    validarCampos,
  ],
  listarTemas
);



module.exports = router;
