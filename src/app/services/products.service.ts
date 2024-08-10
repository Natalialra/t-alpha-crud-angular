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
  }
  getProductById(productId: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/get-one-product/${productId}`);
  }
  updateProduct(productId: number, product: Products): Observable<any>{
    return this.http.patch(`${this.apiUrl}/update-product/${productId}`, product);
  }
  deleteProduct(productId: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete-product/${productId}`);
  }
}
