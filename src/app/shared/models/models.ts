export interface Producto {
    nombre: string,
    descripcion: string,
    sku: string,
    imagen: string,
    precio: number,
}
  

export interface User {
    email: string;
}

export interface Pedido{
    id: string;
    cliente: User;
    productos: ProductosPedidos[];
    precioTotal: number;
    estado: EstadoPedido;
    fecha: Date;
}

export interface ProductosPedidos{
    producto: Producto;
    cantidad : number;
}

export type EstadoPedido = 'pendiente' | 'completado';

  