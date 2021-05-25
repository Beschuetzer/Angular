import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  form: FormGroup;
  error: HttpErrorResponse;

  constructor(
    private authService:AuthService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
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

    const { email, password } = this.form.value;

    if (!this.isLoginMode) {
      this.authService.signUp(email, password).subscribe(response => {
        console.log('response =', response);
        debugger
      }, error => {
        this.error = error;
        console.log('error =', error);
      });
    } else {
      //TODO: implement sign up
    }

    this.form.reset();

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
