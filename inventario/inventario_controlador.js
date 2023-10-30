const express = require("express")
const router = express.Router()
const CreateInventarioDto = require("./inventario_dto.js");
const service = require('./inventario_service');

router.use(express.json())

//Creates an new url
router.post('/', async (req, res) => {
  try{    
    const inventario = new CreateInventarioDto(req.body)
    inventario.cantidad = parseInt(inventario.cantidad);
    const busqueda = await service.search(inventario.id_producto, inventario.calibre);
    if ( busqueda ) {
      const id_inventario = busqueda._id;
      const cantidad = inventario.cantidad + busqueda.cantidad;
      console.log(id_inventario, cantidad)
      inventario.cantidad = cantidad

      const result = await service.updateInventario(id_inventario, inventario)
      res.status(201).json({ mensaje: "Actualizar" }); 
    } else {
      const result = await service.createInventario(inventario);
      res.status(201).json({ mensaje: 'Creado con éxito' + result });      
 
    } 
  } catch(e){
    console.log(e);
    res.status(500).json({ error: e });      
  }    
})

//Gets all the urls
router.get('/', async (req, res) => {
  const result = await service.findAll()
  res.send(result)
})

//Gets the url by id
router.get('/:id', async (req, res) => {
  const result = await service.findById(req.params.id)
  res.send(result)
})

router.put('/:id', (req, res) => {
  res.send(`Updates the url with id ${req.params.id}`)
})

router.delete('/:id', async (req, res) => {
  const result = await service.deleteInventario(req.params.id)
  res.send(result)
})
  
module.exports = router