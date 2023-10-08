require('dotenv').config();


const express = require('express');
const cors = require('cors'); // Middleware para habilitar CORS
const mongoose = require('mongoose');
const Proveedor = require('./models/proveedor'); // Asume que tienes un modelo 'Proveedor' definido

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Habilita CORS para permitir solicitudes desde tu frontend

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

// Conexión a MongoDB
mongoose.connect('mongodb+srv://user_admin:k0eS7TcRKW6nWlQi@cursoprueba.9oelimp.mongodb.net/FrutyFenix+', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conexión a MongoDB establecida');
}).catch((err) => {
  console.error('Error de conexión a MongoDB', err);
});

// app.listen(5173, () => {
//   console.log('Servidor Express escuchando en el puerto 5173');
// });


