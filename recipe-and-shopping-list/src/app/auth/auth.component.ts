import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSignUpResponseData } from '../models/auth-response.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  form: FormGroup;
  errorMessage: HttpErrorResponse;
  successMessage: string;

  constructor(
    private authService:AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  handleResetError() {
    this.errorMessage = null;
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
      this.authService.signUp(email, password).subscribe(response => {
        this.successMessage = `Successfully registered a new account for '${response.email}!'`
        this.errorMessage = null;
        this.router.navigate(['/recipes']);
      }, errorMessage => {
        this.errorMessage = errorMessage;
        this.successMessage = null;
      });
    } else {

      this.authService.login(email, password).subscribe(response => {
        this.successMessage = `Successfully logged in as ${email}.`
        this.errorMessage = null;
        this.router.navigate(['/recipes']);
      }, errorMessage => {
        this.errorMessage = errorMessage;
        this.successMessage = null;
      })
    }

    this.form.reset();
    this.isLoading = false;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
