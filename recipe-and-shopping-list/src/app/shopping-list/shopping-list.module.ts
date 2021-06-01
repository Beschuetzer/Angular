import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
    ErrorMessageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class ShoppingListModule { }
