import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('nameInput') nameInput: ElementRef;
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onClickAddClick(e: Event) {
    const { name, amount, shouldContinue } = this.getIsValidInputs();
    if (shouldContinue) {
      const newIngredient = new Ingredient(name, amount);
      this.shoppingListService.addIngredient(newIngredient);
    }
  }

  onClickDeleteClick(e: Event) {
    const { name } = this.getIsValidInputs();
    this.shoppingListService.deleteIngredient(name);
  }
  
  onClickClearClick(e: Event) {
    this.shoppingListService.clearIngredients();
  }
  
  getIsValidInputs() {
    const nameInputElement = this.nameInput.nativeElement;
    const amountInputElement = this.amountInput.nativeElement;
    if (nameInputElement.value !== '' && amountInputElement.value !== '') return {name: nameInputElement.value, amount: amountInputElement.value, shouldContinue: true};
    return {name: nameInputElement.value, amount: amountInputElement.value, shouldContinue: false};
  }

  get

}
