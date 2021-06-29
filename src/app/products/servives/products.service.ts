import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CarritoService } from './carrito.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly afs: AngularFirestore, private carritoService: CarritoService) { 
  }

  getProducts() {
    return this.afs.collection('Productos').valueChanges();
  }
}
