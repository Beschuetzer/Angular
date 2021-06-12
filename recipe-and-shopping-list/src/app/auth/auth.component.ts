import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../store/app.reducer';
import { AuthService } from './auth.service';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  form: FormGroup;
  errorMessage: string;
  successMessage: string;
  authSub: Subscription;
  storeSub: Subscription;

  emailValue = 'test@test.com';
  passwordValue = 'test123';

  constructor(
    private authService:AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.authSub = this.store.select('auth').subscribe(authState => {
      console.log('this.errorMessage =', this.errorMessage);
      this.isLoading = authState.loading;
      this.errorMessage = authState.authError;
    })
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  handleResetError() {
    this.store.dispatch(
      new AuthActions.ClearError()
    )
  }

  initializeForm() {
    this.form = new FormGroup({
      "email": new FormControl(
        "",
        [
          Validators.required,
          Validators.email,
        ]
      ),
      "password": new FormControl(
        "",
        [
          Validators.required,
          Validators.minLength(6),
        ]
      )
    })
  }

  onFormSubmit(){ 
    if (!this.form.valid) return;
    this.isLoading = true;

    const { email, password } = this.form.value;

    if (!this.isLoginMode) {
      this.store.dispatch(
        new AuthActions.SignUpStart({
          email, password
        })
      )
    } else {
      console.log('dispatch LoginStart------------------------------------------------');
      this.store.dispatch(
        new AuthActions.LoginStart({
          email, password
        })
      )
    }
    this.form.reset();
    this.isLoading = false;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
