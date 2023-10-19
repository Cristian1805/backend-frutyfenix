module.exports = class CreateProductoDto{

    nombre_producto;
    descripcion;
    tipo;
    cantidad;
    unidad;
  
    constructor(data) {
      console.log(data)
      this.nombre_producto = data.nombre_producto;
      this.descripcion = data.descripcion;
      this.tipo = data.tipo;
      this.cantidad = data.cantidad;
      this.unidad = data.unidad;
    }
    
  }
