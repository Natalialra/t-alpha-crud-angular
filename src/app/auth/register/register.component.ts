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
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
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
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator.bind(this)]]
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
  async register(): Promise<void> {
    if (this.registerForm.valid) {
      const newUser: User = {
        name: this.name.value,
        taxNumber: this.taxNumber.value,
        mail: this.mail.value,
        phone: this.phone.value,
        password: this.password.value
      };

      try {
        const response = await this.authService.register(newUser).toPromise();
        console.log(response);
        this.toastr.success('Usuário registrado com sucesso!');
        await this.router.navigate(['/login']);
      } catch (error) {
        console.error(error);
        this.toastr.error('Erro ao registrar usuário!');
      }
    }
  }
  confirmPasswordValidator(control: { value: string; }): {passwordMismatch: boolean} {
    const confirmPasswordValue = control.value;
    const passwordValue = this.registerForm?.get('password')?.value;

    if (confirmPasswordValue !== passwordValue) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
}



