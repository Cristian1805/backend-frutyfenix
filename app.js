const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5173;

// Conexión a MongoDB
mongoose.connect('mongodb+srv://user_admin:k0eS7TcRKW6nWlQi@cursoprueba.9oelimp.mongodb.net/FrutyFenix', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
}).then(() => {
  console.log('Conexión a MongoDB establecida');
}).catch((err) => {
  console.error('Error de conexión a MongoDB', err);
});

// Modelo de Proveedor
const proveedorSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  correo: String,
  telefono: String,
});

const Proveedor = mongoose.model('Proveedor', proveedorSchema);

// Middleware para habilitar CORS
app.use(cors());

// Middleware para analizar JSON en las solicitudes
app.use(express.json());

// Ruta para crear un nuevo proveedor
app.post('/proveedores', async (req, res) => {
  try {
    const { nombre, direccion, correo, telefono } = req.body;

    // Crea un nuevo proveedor en la base de datos
    const nuevoProveedor = new Proveedor({
      nombre,
      direccion,
      correo,
      telefono,
    });

    // Guarda el proveedor en la base de datos
    await nuevoProveedor.save();

    res.status(201).json({ mensaje: 'Proveedor creado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el proveedor' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
