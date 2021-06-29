import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/shared/models/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly afs: AngularFirestore) { 
  }

  getProducts() {
    return this.afs.collection('Productos').valueChanges();
  }
}
