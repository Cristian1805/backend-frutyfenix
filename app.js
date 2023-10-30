const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()
const { dbConnection } = require('./database/config');


const app = express();

// Middleware para habilitar CORS -> Seguridad en las rutas
app.use(cors()); 

//Configurarion de base de datos
dbConnection();

const productos = require('./productos/productos_controlador');
app.use('/productos', productos)

const inventario = require('./inventario/inventario_controlador');
app.use('/inventario', inventario)

const port = process.env.PORT;

// Modelo de Proveedor
const proveedorSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  correo: String,
  telefono: String,
});

const Proveedor = mongoose.model('Proveedor', proveedorSchema);



//Parseo y lectura del body
app.use(express.json());


//Ruta para autenticacion del usuario
app.use('/auth', require('./routes/auth'));

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
app.listen(process.env.PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
