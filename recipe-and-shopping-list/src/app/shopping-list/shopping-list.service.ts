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
      const ingredientIndex = this.getIngredientIndex(ingredient);
      if (ingredientIndex !== -1) {
        this.ingredients[ingredientIndex].amount = ingredient.amount;
        return alert(`${ingredient.name} is already in the list.  Updating the current value`);
      }

      this.ingredients.push(ingredient);
      this.sendUpdatedIngredients();
    }
    else throw new Error('Invalid new ingredient in ShoppingListComponent in addIngredient');
  }

  addIngredients(ingredients: Ingredient[]) {
    if (ingredients.length > 0) {
      //add ingredients not present while adding tallies for ones present
      for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        if (ingredient instanceof Ingredient) {
          const foundIndex = this.getIngredientIndex(ingredient);
          if (foundIndex == -1) {
            //New Ingredient
            this.ingredients.push(ingredient);
          }
          else {
            //Already Present
            this.ingredients[foundIndex].amount += ingredient.amount;
          }
        }
        else throw new Error('Invalid ingredient sent to ShoppingListComponent in addIngredients');;
      }
    }
    else throw new Error('No ingredients sent to ShoppingListComponent in addIngredients');;
    this.sendUpdatedIngredients();
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

  getIngredientIndex(ingredient: Ingredient): number {
    return this.ingredients.findIndex(ingredient2 => ingredient2.name?.toLowerCase() === ingredient.name?.toLowerCase());
  }

  sendUpdatedIngredients() {
    this.updateIngredients.emit(this.ingredients.slice());
  }
}
