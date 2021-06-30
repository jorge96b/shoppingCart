import { Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Pedido, Producto, User, ProductosPedidos } from 'src/app/shared/models/models';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
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
          this.alert();
        }
      }
      this.afs.collection('Clientes/'+this.uai+'/carrito/').doc(this.uai).set(this.pedido).then(() =>{
        
      });
    }
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
    this.alertPedido();
  }

  confirmarPedido(){
    this.pedido.id = this.afs.createId();
    this.pedido.precioTotal=this.getTotal();
    this.afs.collection('Clientes/'+this.uai+'/pedidos/').doc(this.pedido.id).set(this.pedido).then(() =>{
      this.initCarrito();
    }); 
  }

  alertPedido(){
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Confirma tu pedido',
      text: "Revisa tus productos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar pedido!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Su pedido a sido enviado!',
          'Pronto sus prodcutos seran enviados.',
          'success'
        )
        this.confirmarPedido();
        console.log('deleted');
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Sigue comprando',
          'Tu carrito esta esperando por mas productos :)',
          'error'
        )
        console.log('cancel');
      }
    })
  }

  alert(){
    Swal.fire({
      title: 'Estas segudo?',
      text: "Deseas eliminar el prodcuto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'Producto eliminado correctamente.',
          'success'
        )
      }
    })
  }
}
