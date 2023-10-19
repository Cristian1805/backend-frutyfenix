const express = require("express")
const router = express.Router()
const CreateProductoDto = require("./productos_dto.js");
const service = require("./produdctos_service.js");

router.use(express.json())

//Creates an new url
router.post('/', async (req, res) => {
  try{    
    const producto = new CreateProductoDto(req.body)
    const result = await service.createProducto(producto);
    res.status(201).json({ mensaje: 'Creado con éxito' + result });      
  } catch(e){
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

router.delete('/:id', (req, res) => {
  res.send(`Removes the url with id ${req.params.id}`)
})
  
module.exports = router