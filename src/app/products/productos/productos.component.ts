import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/shared/models/models';
import { CarritoService } from '../servives/carrito.service';
import { ProductsService } from '../servives/products.service';
import Swal from 'sweetalert2'
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
    this.alert('Producto añadido','','success','Reintentar','top-end');
  }

  alert(title:string,text:string,icon:any,confie:string,position:any){
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: confie,
      position: position,
      showConfirmButton: false,
      timer: 1500
    })
  }

}
