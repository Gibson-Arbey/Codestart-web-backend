const { Schema, model } = require("mongoose");

const resultadoSchema = new Schema({
    puntaje: {
        type: Number,
        required: true,
        min: [0, 'El puntaje debe ser como mínimo 0'],
        max: [100, 'El puntaje debe ser como máximo 100']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    tema: {
        type: Schema.Types.ObjectId,
        ref: 'Tema',
        required: true
    }
}, {
    timestamps: true
});

resultadoSchema.methods.toJSON = function () {
    const { __v, _id, ...resultado } = this.toObject();
    resultado.id = _id;
    return resultado;
  };

const Resultado = model('Resultado', resultadoSchema);

module.exports = Resultado;
