const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  
    id_producto: {
      type: Number,
      unique: true // No debe repetirse el ID
    },
    nombre_producto: String,
    descripcion: String,
    tipo: String, // importado | nacional
    cantidad: Number,
    unidad: String // calibre/kilos/
});

const productoModel = mongoose.model('Producto', productoSchema);

module.exports = {

    createProducto: async (producto) => {     
     return await new productoModel(producto).save();
    },

    findAll: async () => {
      const filter = {};
      return await productoModel.find(filter);      
    },

    findById: async (id_producto) => {      
      return await productoModel.findById(id_producto);

    },

    updateProducto: async (id_producto, updatedProducto) => {
      return await productoModel.findByIdAndUpdate(id_producto, updatedProducto, { new: true });
  },

    deleteProducto: async (id_producto) => {
      return await productoModel.findByIdAndRemove(id_producto);
  }

}

//banano, nacional, 50, kilos
//manzanas, importado, 20, cajas