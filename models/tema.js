const { Schema, model } = require("mongoose");

const temaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del tema es obligatorio"],
      maxlength: [100, "El nombre no puede exceder los 100 caracteres"],
    },
    orden: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

temaSchema.methods.toJSON = function () {
  const { __v, _id, ...tema } = this.toObject();
  tema.id = _id;
  return tema;
};

const Tema = model("Tema", temaSchema);

module.exports = Tema;
