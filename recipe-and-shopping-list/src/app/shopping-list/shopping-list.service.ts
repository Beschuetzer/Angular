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
    if (ingredient instanceof Ingredient) {
      const ingredientIndex = this.ingredients.findIndex(ingredient2 => ingredient2.name?.toLowerCase() === ingredient.name?.toLowerCase());
      
      if (ingredientIndex !== -1) {
        this.ingredients[ingredientIndex].amount = ingredient.amount;
        return alert(`${ingredient.name} is already in the list.  Updating the current value`);
      }

      this.ingredients.push(ingredient);
      this.updateIngredients.emit(this.ingredients);
    }
    else throw new Error('Invalid new ingredient in ShoppingListComponent hanldeNewIngredient');
  }
}
