module.exports = class CreateInventarioDto{


    id_producto;
    calibre;
    cantidad;
    unidad;
    
    constructor(data) {
      console.log(data)
      this.id_producto = data.id_producto;
      this.calibre = data.calibre; 
      this.cantidad = data.cantidad;
      this.unidad = data.unidad;
    }
    
  }
