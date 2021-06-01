import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path: '', component: AuthComponent},
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
