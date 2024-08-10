import {Component, OnInit, Output} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Products} from '../../models/products';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  public products$: Observable<Products[]> = this.productsService.getAllProducts() as Observable<Products[]>;

  constructor(
    private productsService: ProductsService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  edit(id): void {
    this.router.navigate([`newproduct/${id}`]);
  }

}
