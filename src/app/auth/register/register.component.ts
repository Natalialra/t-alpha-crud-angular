import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup = this.initializeForm();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  initializeForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      taxNumber: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  get name () {
    return this.registerForm.get('name');
  }

  get taxNumber () {
    return this.registerForm.get('taxNumber');
  }

  get mail () {
    return this.registerForm.get('mail');
  }

  get phone () {
    return this.registerForm.get('phone');
  }

  get password () {
    return this.registerForm.get('password');
  }

  get confirmPassword () {
    return this.registerForm.get('confirmPassword');
  }


}
