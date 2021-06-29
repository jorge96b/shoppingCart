import { Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Pedido, Producto, User, ProductosPedidos } from 'src/app/shared/models/models';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarritoService{

  path = 'carrito/';
  uai = '';
  user : any;
  private pedido: Pedido | any;

  constructor(public authService:AuthService,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    ) {
    this.afAuth.authState.subscribe(user => {
      if(user !== null){
        this.uai=user.uid;
        this.loadCliente();
      }else{}
    })
  }

  initCarrito(){
    this.pedido = {
      id: this.uai,
      cliente: this.user,
      productos: [],
      precioTotal:null,
      estado: 'pendiente',
      fecha: new Date(),
    }
  }

  loadCliente(){
    this.authService.getDataUser(this.uai).subscribe(
      (user:any) => {
        this.user=user;
        this.loadCarrito();
      }
    );
  }

  loadCarrito(){
    const path = 'Clientes/'+this.uai+'/'+this.path;
    this.afs.collection(path).doc(this.uai).valueChanges().subscribe(
      (carrito:any) => {
        if(carrito == undefined){
          this.initCarrito();
        }else{
          this.pedido=carrito;
        }
      }
    );
  }

  getCarrito(){
    return this.pedido;
  }

  addProducto(producto: Producto){
    if(this.uai.length){
      const item = this.pedido.productos.find((productoPedido:any) => {
        return(productoPedido.producto.sku==producto.sku)
      })
      if(item !== undefined){
        item.cantidad ++;
      } else{
        const add : ProductosPedidos={
          cantidad: 1,
          producto: producto,
        }
        this.pedido.productos.push(add);
      }
      this.afs.collection('Clientes/'+this.uai+'/carrito/').doc(this.uai).set(this.pedido).then(() =>{
      });
    }else{
      this.router.navigate(['/login']);
      return
    }
  }

  removeProducto(producto: Producto){
    if(this.uai.length){
      let position = 0;
      const item = this.pedido.productos.find((productoPedido:any, index:number) => {
        position = index;
        return(productoPedido.producto.sku==producto.sku)
      })
      if(item !== undefined){
        item.cantidad --;
        if(item.cantidad==0){
          this.pedido.productos.splice(position,1);
        }
      }
      this.afs.collection('Clientes/'+this.uai+'/carrito/').doc(this.uai).set(this.pedido).then(() =>{
      });
    }
  }

  realizarPedido(){

  }

  clearCarrito(){
    
  }

  getTotal():number{
    let total=0;
    this.pedido.productos.forEach((producto: ProductosPedidos) => {
      total= (producto.cantidad * producto.producto.precio) + total;
    });
    return total;
  }

  getCantidad():number{
    let cantidad=0;
    this.pedido.productos.forEach((producto: ProductosPedidos) => {
      cantidad=  producto.cantidad + cantidad;
    });
    return cantidad;
  }

  savePerido(){
    this.pedido.id = this.afs.createId();
    this.pedido.precioTotal=this.getTotal();
    this.afs.collection('Clientes/'+this.uai+'/pedidos/').doc(this.pedido.id).set(this.pedido).then(() =>{
      this.initCarrito();
    });
  }
}
