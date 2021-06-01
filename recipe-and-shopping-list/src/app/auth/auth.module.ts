import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
];

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
