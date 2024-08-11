import {Component} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup = this.initializeForm();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

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

  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      this.toastr.warning('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const credentials = this.loginForm.value;

    try {
      const response = await this.authService.login(credentials).toPromise();

      if (response.success) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        this.authService.setAuthenticationHeaders(token);

        this.toastr.success('Login realizado com sucesso!');
        await this.router.navigate(['/products']);
      } else {
        this.handleLoginError();
      }
    } catch (error) {
      this.handleLoginError(error);
    }
  }
  private handleLoginError(error?: any): void {
    console.error('Erro ao realizar login:', error);
    this.toastr.error('Erro ao realizar login, verifique os dados informados.');
  }
}
