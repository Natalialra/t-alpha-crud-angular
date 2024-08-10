import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {ProductsListComponent} from './products/products-list/products-list.component';
import {ProductsFormComponent} from './products/products-form/products-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: ProductsListComponent },
  { path: 'newproduct', component: ProductsFormComponent },
  { path: 'products', component: ProductsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
