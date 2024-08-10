import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Products} from '../models/products';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


interface ProductsResponse {
  data: {
    products: Products[];
  };
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://interview.t-alpha.com.br/api/products';
  public headers = this.createAuthHeaders();
  constructor(private http: HttpClient) { }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  createProduct(product: Products): Observable<any>{
    return this.http.post(`${this.apiUrl}/create-product`, product, {headers: this.headers});
  }
  getAllProducts(): Observable<Products[]> {
    return this.http.get<ProductsResponse>(`${this.apiUrl}/get-all-products`, {headers: this.headers})
      .pipe(
        map(response => response.data.products)
      );
  }
  getProductById(productId: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/get-one-product/${productId}`, {headers: this.headers});
  }
  updateProduct(productId: number, product: Products): Observable<any>{
    return this.http.patch(`${this.apiUrl}/update-product/${productId}`, product, {headers: this.headers});
  }
  deleteProduct(productId: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete-product/${productId}`, {headers: this.headers});
  }
}
