import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public updateIngredients = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Oranges', 10),
  ];
  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    debugger
    if (ingredient instanceof Ingredient) {
      const ingredientIndex = this.ingredients.findIndex(ingredient2 => ingredient2.name?.toLowerCase() === ingredient.name?.toLowerCase());
      
      if (ingredientIndex !== -1) {
        this.ingredients[ingredientIndex].amount = ingredient.amount;
        return alert(`${ingredient.name} is already in the list.  Updating the current value`);
      }

      this.ingredients.push(ingredient);
      this.sendUpdatedIngredients();
    }
    else throw new Error('Invalid new ingredient in ShoppingListComponent hanldeNewIngredient');
  }

  clearIngredients() {
    this.ingredients = [];
    this.sendUpdatedIngredients();
  }

  deleteIngredient(name: string) {
    const indexOfIngredient = this.ingredients.findIndex(ingredient => ingredient.name?.toLowerCase() === name?.toLowerCase());
    if (indexOfIngredient !== -1) {
      this.ingredients.splice(indexOfIngredient, 1);
      this.sendUpdatedIngredients();
    }
    else alert(`${name} is not in the ingredient list.  You can add it though.`)
  }

  sendUpdatedIngredients() {
    this.updateIngredients.emit(this.ingredients);
  }
}
