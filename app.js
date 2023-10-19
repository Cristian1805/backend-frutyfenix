const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();

const productos = require('./productos/productos_controlador')
app.use('/productos', productos)

const port = process.env.PORT;

// Conexión a MongoDB
mongoose.connect(process.env.URI, {
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
    const nuevoProveedor = new Proveedor({nombre, direccion, correo, telefono});    
    await nuevoProveedor.save();
    res.status(201).json({ mensaje: 'Proveedor creado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el proveedor' }); 
  }
});

//Leer todos
app.get('/proveedores', async (req, res) => {
  const filter = {};
  const all = await Proveedor.find(filter);
  res.send(all)
})

//Leer por id
app.get('/proveedores/:id', async (req, res) => {
  const response = await Proveedor.findById(req.params.id)
  res.send(response)
})

//Actualizar
app.put('/proveedores/:id',async (req, res) => {  
  console.log(req.body)
  const response = await Proveedor.updateOne({_id:req.params.id}, req.body)
  res.send(response)  
})

//Eliminar
app.delete('/proveedores/:id', async (req, res) => {  
  const response = await Proveedor.deleteOne({_id:req.params.id});
  res.send(response)
})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
