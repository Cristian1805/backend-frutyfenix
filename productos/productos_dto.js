module.exports = class CreateProductoDto{


    id_producto;
    nombre_producto;
    descripcion;
    tipo;
    cantidad;
    unidad;
    
    constructor(data) {
      console.log(data)
      this.id_producto = data.id_producto;
      this.nombre_producto = data.nombre_producto;
      this.descripcion = data.descripcion;
      this.tipo = data.tipo;
      this.cantidad = data.cantidad;
      this.unidad = data.unidad;
    }
    
  }
