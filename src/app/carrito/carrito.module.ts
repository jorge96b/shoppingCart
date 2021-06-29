import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoRoutingModule } from './carrito-routing.module';
import { CarritoComponent } from './carrito.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    CarritoComponent
  ],
  imports: [
    CommonModule,
    CarritoRoutingModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule
  ]
})
export class CarritoModule { }
