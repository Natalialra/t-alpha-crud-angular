import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Products} from '../models/products';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://interview.t-alpha.com.br/api/products';
  constructor(private http: HttpClient) { }

  createProduct(product: Products): Observable<any>{
    return this.http.post(`${this.apiUrl}/create-product`, product);
  }
  getAllProducts(): Observable<any>{
    return this.http.get(`${this.apiUrl}/get-all-products`);
  }}
