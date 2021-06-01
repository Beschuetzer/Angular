import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlaceholderDirective } from '../directives/placeholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  form: FormGroup;
  errorMessage: HttpErrorResponse;
  successMessage: string;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  private closeSubscription: Subscription;

  constructor(
    private authService:AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy() {
    if (this.closeSubscription) this.closeSubscription.unsubscribe();
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
        this.showErrorAlert(errorMessage);
        this.successMessage = null;
      });
    } else {

      this.authService.login(email, password).subscribe(response => {
        this.successMessage = `Successfully logged in as ${email}.`
        this.errorMessage = null;
        this.router.navigate(['/recipes']);
      }, errorMessage => {
        this.errorMessage = errorMessage;
        this.showErrorAlert(errorMessage);
        this.successMessage = null;
      })
    }

    this.form.reset();
    this.isLoading = false;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  private showErrorAlert(errorMessage: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

    componentRef.instance.message = errorMessage;
    this.closeSubscription =  componentRef.instance.resetError.subscribe(error => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    })
  }
}
