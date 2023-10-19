const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({    
    nombre_producto: String,
    descripcion: String,
    tipo: String, // imporado | nacional
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
    }

}

//banano, nacional, 50, kilos
//manzanas, importado, 20, cajas