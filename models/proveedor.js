const mongoose = require('mongoose');

// Define el esquema del proveedor
const proveedorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  correoElectronico: {
    type: String,
    required: true,
    unique: true // Asegura que cada correo electrónico sea único
  },
  telefono: {
    type: String,
    required: true
  },

}, {
  timestamps: true // Agrega campos de fecha de creación y modificación automáticamente
});

// Crea el modelo 'Proveedor' a partir del esquema
const Proveedor = mongoose.model('Proveedor', proveedorSchema);

module.exports = Proveedor;
