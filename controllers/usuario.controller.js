const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const { Usuario } = require("../models");

const guardarUsuario = async (req = request, res = response) => {
  try {
    const { nombre, correo, contrasena } = req.body;
    const usuarioExistente = await Usuario.findOne({ correo: correo });

    if (usuarioExistente) {
      return res.status(400).json({
        type: "error",
        msg: "El correo electrónico ya está registrado.",
      });
    }

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    const contrasenaEncriptada = bcryptjs.hashSync(contrasena, salt);
   
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contrasena: contrasenaEncriptada,
    });

    // Guardar el nuevo usuario en la base de datos
    await nuevoUsuario.save();

    return res
      .status(200)
      .json({ type: "success", msg: "Usuario registrado exitosamente" });
  } catch (error) {
    return res.status(500).json({ type: "error", msg: error.message });
  }
};

module.exports = {
  guardarUsuario,
};
