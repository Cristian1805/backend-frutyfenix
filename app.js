const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()


const app = express();
const port = process.env.PORT;

// Conexión a MongoDB
mongoose.connect('mongodb+srv://user_admin:k0eS7TcRKW6nWlQi@cursoprueba.9oelimp.mongodb.net/Inventario-FrutyFenix', {
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

//Gets all the urls
app.get('/proveedores', async (req, res) => {
  const filter = {};
  const all = await Proveedor.find(filter);
  res.send(all)
})


//Gets the url by id
app.get('/proveedores/:id', (req, res) => {
  res.send(`Gets the url with id ${req.params.id}`)
})

app.put('/proveedores/:id', (req, res) => {
  res.send(`Updates the url with id ${req.params.id}`)
})

app.delete('/proveedores/:id', (req, res) => {
  res.send(`Removes the url with id ${req.params.id}`)
})


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
