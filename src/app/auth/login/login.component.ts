import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = this.initializeForm();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  initializeForm(): any {
    return this.formBuilder.group({
      taxNumber: ['', [Validators.required, Validators.minLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get taxNumber(): any {
    return this.loginForm.get('taxNumber');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  login(): void {
    // TODO
  }
}
