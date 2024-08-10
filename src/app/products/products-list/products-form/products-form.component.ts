import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Products} from '../../../models/products';
import {ProductsService} from '../../../services/products.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  public productForm: FormGroup = this.initializeForm();
  public isEditMode = false;
  public productId: string;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.isEditMode = true;
        console.log(this.productId);
        this.loadProduct(this.productId);
      }
    });
  }

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

  saveProduct(): void {
    if (this.productForm.valid) {
      const productData: Products = this.productForm.value;

      if (this.isEditMode) {
        this.updateProduct(this.productId, productData);
      } else {
        this.createProduct(productData);
      }
    } else {
      this.toastr.warning('Preencha todos os campos obrigatórios.');
    }
  }


  createProduct(productData): void {

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
  }

  updateProduct(id: string, productData: Products): void {
    this.productService.updateProduct(id, productData).subscribe({
      next: () => {
        this.toastr.success('Produto atualizado com sucesso!');
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Erro ao atualizar produto:', error);
        this.toastr.error('Erro ao tentar atualizar o produto!');
      }
    });
  }

  loadProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock
        });
      },
      error: (error) => {
        console.error('Erro ao carregar o produto:', error);
        this.toastr.error('Erro ao tentar carregar o produto!');
      }
    });
  }
}

