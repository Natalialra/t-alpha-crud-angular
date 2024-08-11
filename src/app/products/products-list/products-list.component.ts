import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Products} from '../../models/products';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  public products$: Observable<Products[]> = this.productsService.getAllProducts() as Observable<Products[]>;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }
  view(id): void {
    this.router.navigate([`product/${id}`], {queryParams: {mode: 'view'}});
  }
  edit(id): void {
    this.router.navigate([`product/${id}`]);
  }
  delete(id): void {
    this.productsService.deleteProduct(id).subscribe(() => {
      this.toastr.success('Produto deletado com sucesso!');
      this.products$ = this.productsService.getAllProducts() as Observable<Products[]>;
    });
  }

}
