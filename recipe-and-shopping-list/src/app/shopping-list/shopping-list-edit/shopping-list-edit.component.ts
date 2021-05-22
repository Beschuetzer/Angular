import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  form: FormGroup;
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(
        null,
        [
          Validators.required,
        ],
      ),
      amount: new FormControl(
        0,
        [
          Validators.required, Validators.min(1),
        ],
      )
    });

    this.shoppingListService.sendClickedIngredient.subscribe((ingredient) => {
      this.form.reset({
        name: ingredient.name,
        amount: ingredient.amount,
      })
    })
  }

  onFormSubmit() {
    const { name, amount } = this.form.value;
    const newIngredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(newIngredient);
  }

  onClickDeleteClick(e: Event) {
    // const { name } = this.getIsValidInputs();
    // this.shoppingListService.deleteIngredient(name);
  }
  
  onClickClearClick(e: Event) {
    this.form.reset();
  }
  
  // getIsValidInputs() {
  //   const nameInputElement = this.nameInput.nativeElement;
  //   const amountInputElement = this.amountInput.nativeElement;
  //   if (nameInputElement.value !== '' && amountInputElement.value !== '') return {name: nameInputElement.value, amount: amountInputElement.value, shouldContinue: true};
  //   return {name: nameInputElement.value, amount: amountInputElement.value, shouldContinue: false};
  // }
}
