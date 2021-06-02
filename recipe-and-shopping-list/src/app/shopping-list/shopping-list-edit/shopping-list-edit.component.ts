import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameField') nameField: ElementRef;
  @ViewChild('amountField') amountField: ElementRef;
  form: FormGroup;
  sendClickedIngredientSubscription: Subscription;
  clickedIngredientSubscription: Subscription;
  sendCheckShouldResetFromAfterDeleteSubscription: Subscription;
  clickedIngredient: Ingredient;
  amountMin = 1;
  
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>,

  ) { }

  checkShouldResetForm(ingredient: Ingredient) {
    if (+this.amountField.nativeElement.value === ingredient.amount && this.nameField.nativeElement.value.toLowerCase() === ingredient.name.toLowerCase()) this.resetForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      name: new FormControl(
        null,
        [
          Validators.required,
        ],
      ),
      amount: new FormControl(
        this.amountMin,
        [
          Validators.required, Validators.min(this.amountMin),
        ],
      )
    });
  }

  ngOnDestroy() {
    this.sendClickedIngredientSubscription.unsubscribe();
    this.clickedIngredientSubscription.unsubscribe();
    this.sendCheckShouldResetFromAfterDeleteSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.clickedIngredient = this.shoppingListService.getClickedIngredient();
    this.setupSubscriptions();
    this.initializeForm();
  }

  onFormSubmit() {
    const { name, amount } = this.form.value;
    const newIngredient = new Ingredient(name, amount);

    this.shoppingListService.addIngredient(newIngredient);
    
    this.resetForm();
  }

  onClickClearClick(e: Event) {``
    this.resetForm();
  }

  onNameInputChange(name: string) {
    const clickedIngredient = this.shoppingListService.getClickedIngredient();
    if (clickedIngredient?.name?.toLowerCase() !== name?.toLowerCase()) {
      this.shoppingListService.clearIngredients(document.querySelector('#ingredients'));
      this.shoppingListService.updateCanDeleteIngredient(false);
    }
  }

  resetForm() {
    this.form.reset({
      amount: this.amountMin,
    });
  }

  setupSubscriptions() {
    this.clickedIngredientSubscription = this.shoppingListService.sendClickedIngredient.subscribe((Ingredient) => {
      this.clickedIngredient = Ingredient;
    })

    this.sendCheckShouldResetFromAfterDeleteSubscription = this.shoppingListService.sendCheckShouldResetFromAfterDelete.subscribe((ingredient) => {
      this.checkShouldResetForm(ingredient);
    })
    
    this.sendClickedIngredientSubscription = this.shoppingListService.sendClickedIngredient.subscribe((ingredient) => {
      if (ingredient) {
        this.form.reset({
          name: ingredient.name,
          amount: ingredient.amount,
        });
      }
    })
  }
}
