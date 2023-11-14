const mongoose = require('mongoose');

const inventarioSchema = new mongoose.Schema({
    id_producto: String,
    calibre: String, 
    cantidad: Number, 
    unidad: String // calibre/kilos/ 
});

const inventarioModel = mongoose.model('inventario', inventarioSchema);

module.exports = {

    createInventario: async (inventario) => {     
     return await new inventarioModel(inventario).save();
    },

    findAll: async () => {
      const filter = {};
      return await inventarioModel.find(filter);      
    },

    findById: async (id_inventario) => {      
      return await inventarioModel.findById(id_inventario);

    },

    search: async (id_producto, calibre) => {
      const filter = {
        id_producto: id_producto, 
        calibre: calibre 
      };
      return await inventarioModel.findOne(filter);

    },

    updateInventario: async (id_inventario, updatedInventario) => {
      return await inventarioModel.findByIdAndUpdate(id_inventario, updatedInventario, { new: true });
  },

    deleteInventario: async (id_inventario) => {
      return await inventarioModel.findByIdAndRemove(id_inventario);
  }

}
