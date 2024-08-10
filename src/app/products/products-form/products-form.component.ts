import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  public productForm: FormGroup = this.initializeForm();
  public isEditMode = false;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  initializeForm(): FormGroup {
    return this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]]
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
   return null;
  }
}
