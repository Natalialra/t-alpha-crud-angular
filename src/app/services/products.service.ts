import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Products} from '../models/products';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://interview.t-alpha.com.br/api/products';

  constructor(private http: HttpClient) { }
  createProduct(product: Products): Observable<Products> {
    return this.http
      .post<Products>(`${this.apiUrl}/create-product`, product)
      .pipe(catchError(this.handleError));
  }

  getAllProducts(): Observable<Products[]> {
    return this.http
      .get<{ data: { products: Products[] } }>(`${this.apiUrl}/get-all-products`)
      .pipe(
        map(response => response.data.products),
        catchError(this.handleError)
      );
  }
  getProductById(productId: string): Observable<Products> {
    return this.http
      .get<{ data: { product: Products } }>(`${this.apiUrl}/get-one-product/${productId}`)
      .pipe(
        map(response => response.data.product),
        catchError(this.handleError)
      );
  }
  updateProduct(productId: string, product: Products): Observable<Products> {
    return this.http
      .patch<Products>(`${this.apiUrl}/update-product/${productId}`, product)
      .pipe(catchError(this.handleError));
  }
  deleteProduct(productId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/delete-product/${productId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
