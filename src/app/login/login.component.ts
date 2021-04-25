import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators'
import { Router } from '@angular/router';
import { throwError } from 'rxjs';


import { AuthService } from '../auth/auth.service';

import { assetUrl } from '../../asset-url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  logoUrl = assetUrl("atlasware-logo.svg");
  logoWhiteUrl = assetUrl("atlasware-logo-white.svg");

  submitted = false;

  loginFormValidation: { formMsg: string, emailMsg: string, passwordMsg: string } = {
    formMsg: '',
    emailMsg: '',
    passwordMsg: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.loginForm.valueChanges.pipe(
      tap((res) => {
        console.log(res);
        return res
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.checkPermissions();
    if (this.authService.checkUserIsAuthenticated()) {
      this.router.navigate(['/dashboard'])
    }
  }

  login() {
    console.log(this.loginForm.valid)
    this.submitted = true;
    const body = this.loginForm.value;
    this.authService.signIn(body).pipe(
      // tipar response quando alinhar o contrato
      tap((response: any) => {
        sessionStorage.setItem('authUser', JSON.stringify(response));
        console.log(response);
        this.router.navigate(['/dashboard']);
      }),
      catchError((error: HttpErrorResponse) => {
        this.loginFormValidation.formMsg = ''

        if (error.statusText === 'Unauthorized' || error.status === 422 || error.status === 401) {
          this.loginFormValidation.formMsg = 'Verifique seus dados de login e/ou senha e tente novamente';
          this.loginForm.controls['email'].setErrors({ 'incorrect': true });
          this.loginForm.controls['password'].setErrors({ 'incorrect': true });
        }

        return throwError(error);
      })
    ).subscribe()
    this.clearValidation();

  }

  checkPermissions() {
    // const permissionViewHome = this.authService.checkUserPermissions("VIEW_HOME");
    // console.log(permissionViewHome);
  }

  clearValidation() {
    this.loginFormValidation = {
      formMsg: '',
      emailMsg: '',
      passwordMsg: ''
    }
  }

  // loginSucess() {
  //   console.log('entrei aqui')
  //   // this.toastr.success('Login efetuado com sucesso');
  // }

  // loginFail() {
  //   console.log('entrei aqui error')
  //   // this.toastr.error('Login e senha são campos obrigatórios');
  // }

  get form() {
    return this.loginForm.controls;
  }

  applyCssError(field: string): { 'is-invalid': boolean } {
    return {
      'is-invalid': (this.submitted && !this.loginForm.get(field).valid)
    }
  }



}
