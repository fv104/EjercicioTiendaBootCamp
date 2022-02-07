import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductComponent } from '../product/product.component';



@NgModule({
  declarations: [
    ProductosComponent,
    ProductComponent
    
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MaterialModule,
    
  ]
})
export class ProductosModule { }
