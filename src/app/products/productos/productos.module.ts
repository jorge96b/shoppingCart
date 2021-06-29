import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { MatListModule } from '@angular/material/list';
import  {MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ProductosComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MatListModule,
    MatCardModule
  ]
})
export class ProductosModule { }
