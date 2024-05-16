const { request, response } = require("express");
const { Usuario, Tema, Resultado } = require("../models");

const registrarResultado = async (req, res) => {
  try {
    const { usuarioId, temaId, puntaje } = req.body;

    // Buscar el usuario por su ID
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res
        .status(400)
        .json({ type: "error", msg: "No se encontró el usuario." });
    }

    // Buscar el tema por su ID
    const tema = await Tema.findById(temaId);
    if (!tema) {
      return res
        .status(400)
        .json({ type: "error", msg: "No se encontró el tema." });
    }

    // Buscar el resultado del usuario para el tema especificado
    let resultado = await Resultado.findOne({
      usuario: usuarioId,
      tema: temaId,
    });

    // Si no hay resultado, crear uno nuevo
    if (!resultado) {
      resultado = new Resultado({
        usuario: usuarioId,
        tema: temaId,
        puntaje: puntaje,
      });
    } else {
      // Si existe, actualizar el puntaje
      resultado.puntaje = puntaje;
    }

    // Guardar el resultado en la base de datos
    await resultado.save();

    return res
      .status(200)
      .json({ type: "success", msg: "Resultado registrado exitosamente" });
  } catch (error) {
    return res.status(500).json({ type: "error", msg: error.message });
  }
};

module.exports = {
  registrarResultado,
};
