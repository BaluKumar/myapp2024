import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { SharedModule } from '../shared/shared.module';
import { PascalCasePipe } from './pipe/pascal-case.pipe';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    ProductListComponent,
    AddEditProductComponent,
    PascalCasePipe,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProductsModule { }
