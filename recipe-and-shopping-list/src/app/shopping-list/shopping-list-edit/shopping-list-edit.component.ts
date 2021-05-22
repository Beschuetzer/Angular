import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sendClickedIngredientSubscription: Subscription;
  
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

    this.sendClickedIngredientSubscription = this.shoppingListService.sendClickedIngredient.subscribe((ingredient) => {
      this.form.reset({
        name: ingredient.name,
        amount: ingredient.amount,
      })
    })
  }

  ngOnDestroy() {
    this.sendClickedIngredientSubscription.unsubscribe();
  }

  onFormSubmit() {
    const { name, amount } = this.form.value;
    const newIngredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(newIngredient);
  }

  onClickClearClick(e: Event) {
    this.form.reset();
  }

  onNameInputChange(name: string) {
    const clickedIngredient = this.shoppingListService.getClickedIngredient();
    if (clickedIngredient.name.toLowerCase() !== name.toLowerCase()) {
      this.shoppingListService.clearIngredients(document.querySelector('#ingredients'));
      this.shoppingListService.updateCanDeleteIngredient(false);
    }
  }

}
