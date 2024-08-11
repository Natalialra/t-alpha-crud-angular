import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ProductsFormComponent } from './products/products-list/products-form/products-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { LOCALE_ID } from '@angular/core';
import { CurrencyPipe } from './pipes/currency.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductsListComponent,
    ProductsFormComponent,
    CurrencyPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
