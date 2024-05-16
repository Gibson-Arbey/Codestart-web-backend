const { Schema, model } = require("mongoose");

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        maxlength: [50, 'El correo no puede exceder los 50 caracteres']
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
}, {
    timestamps: true, 
    toJSON: { virtuals: true }, // Asegura que los campos virtuales se incluyan en el output cuando se conviertan los documentos a JSON
    toObject: { virtuals: true }
});

// No retornar la version y cambiar _id por uid
usuarioSchema.methods.toJSON = function () {
    const { __v, _id, ...usuario } = this.toObject();
    usuario.id = _id;
    return usuario;
  };
// Crear un modelo basado en el esquema
const Usuario = model('Usuario', usuarioSchema);

module.exports = Usuario;
