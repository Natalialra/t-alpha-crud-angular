import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Products} from '../../models/products';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
public products$: Observable<Products[]> = this.productsService.getAllProducts() as Observable<Products[]>;
  constructor(private productsService: ProductsService) { }
  ngOnInit(): void {
    this.products$.subscribe(products => console.log(products));
  }

}
