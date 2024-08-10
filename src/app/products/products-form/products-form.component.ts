import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Products} from '../../models/products';
import {ProductsService} from '../../services/products.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  public productForm: FormGroup = this.initializeForm();
  public isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {}

  initializeForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      stock: ['', Validators.required]
    });
  }

  get name(): AbstractControl {
    return this.productForm.get('name');
  }

  get description(): AbstractControl {
    return this.productForm.get('description');
  }

  get price(): AbstractControl {
    return this.productForm.get('price');
  }

  get stock(): AbstractControl {
    return this.productForm.get('stock');
  }

  createProduct(): void {
    if (this.productForm.valid) {
      const productData: Products = this.productForm.value;

      this.productService.createProduct(productData).subscribe({
        next: () => {
            this.productForm.reset();
            this.toastr.success('Produto criado com sucesso!');
            this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Erro ao criar produto:', error);
          this.toastr.error('Erro ao tentar cadastrar o produto!');
        }
      });
    } else {
      this.toastr.warning('Preencha todos os campos obrigatórios.');
    }
  }
}
