const { request, response } = require("express");
const { Tema } = require("../models");

const listarTemas = async (req = request, res = response) => {
  try {
    const temas = await Tema.find();

    return res.json({ type: "success", temas });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ type: "error", msg: error.message });
  }
};

module.exports = {
  listarTemas,
};
