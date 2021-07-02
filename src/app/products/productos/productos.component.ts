import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/shared/models/models';
import { CarritoService } from '../servives/carrito.service';
import { ProductsService } from '../servives/products.service';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  

  public productos : Producto[] = [];

  constructor(private productsService: ProductsService, private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(
      (prod:any) => {
        this.productos = prod;
        console.log(prod);
        console.log(this.productos);
      }
    );
  }

  addCarrito(producto: Producto){
    this.carritoService.addProducto(producto);
  }

}
