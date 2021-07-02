import {Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarritoService } from '../servives/carrito.service';
import { Pedido, Producto } from '../../shared/models/models';

/**
 * @title Dialog with header, scrollable content and actions
 */
 @Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent{

  pedido: Pedido;
  cantidad:number = 0;
  total: number = 0;
  numProductos: number = 0;

  constructor(public dialog: MatDialog, public carritoService:CarritoService) {
    this.pedido=this.carritoService.getCarrito();
    this.numProductos = this.pedido.productos.length;
    this.total= this.carritoService.getTotal();
    this.cantidad= this.carritoService.getCantidad();
  }

  actualizarDatos(){
    this.pedido=this.carritoService.getCarrito();
    this.numProductos = this.pedido.productos.length;
    this.total= this.carritoService.getTotal();
    this.cantidad= this.carritoService.getCantidad();
  }

  addProduct(producto: Producto){
    this.carritoService.addProducto(producto);
    this.actualizarDatos();
  }

  removeProducto(producto: Producto){
    this.carritoService.removeProducto(producto);
    this.actualizarDatos();
  };

  realizarPedir(){
    this.pedido.fecha= new Date();
    this.carritoService.savePerido();
    this.actualizarDatos();
    this.dialog.closeAll();
  }

}
