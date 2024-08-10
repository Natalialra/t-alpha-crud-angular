import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = this.initializeForm();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

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

  async login(loginForm: FormGroup): Promise<void> {
    if (loginForm.valid) {
      const credentials = this.loginForm.value;

      try {
        const response = await this.authService.login(credentials).toPromise();

        if (response.success) {
          console.log('Successfully logged in');
          const token = response.data.token;
          localStorage.setItem('authToken', token);
          this.authService.setAuthenticationHeaders(token);

          this.toastr.success('Login realizado com sucesso!');
          await this.router.navigate(['/products']);
        } else {
          this.toastr.error('Erro ao realizar login, verifique os dados informados');
        }
      } catch (error) {
        console.error('Erro ao realizar login:', error);
      }
    }
  }
}
