import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup = this.initializeForm();
  constructor(
    private formBuilder: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router
  ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  initializeForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      taxNumber: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get name(): AbstractControl {
    return this.registerForm.get('name');
  }
  get taxNumber(): AbstractControl {
    return this.registerForm.get('taxNumber');
  }
  get mail(): AbstractControl {
    return this.registerForm.get('mail');
  }
  get phone(): AbstractControl {
    return this.registerForm.get('phone');
  }
  get password(): AbstractControl {
    return this.registerForm.get('password');
  }
  get confirmPassword(): AbstractControl {
    return this.registerForm.get('confirmPassword');
   }
  // tslint:disable-next-line:typedef
 register(): void {
  console.log(this.registerForm.getRawValue());
  if (this.registerForm.valid) {
     const newUser: User = {
       name: this.registerForm.value.name,
       taxNumber: this.registerForm.value.taxNumber,
       mail: this.registerForm.value.mail,
       phone: this.registerForm.value.phone,
       password: this.registerForm.value.password
     };
     this.authService.register(newUser).subscribe(
       response => {
         console.log(response);
         this.toastr.success('Usuário registrado com sucesso!');
         this.router.navigate(['/login']);
       },
       error => {
         console.log(error);
         this.toastr.error('Erro ao registrar usuário!');
       }
     );
   } else {
     this.toastr.error('Erro ao registrar usuário, verifique os dados informados.');
   }
  }}



