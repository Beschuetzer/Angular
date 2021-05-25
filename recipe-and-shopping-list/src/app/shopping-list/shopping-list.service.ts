import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public sendClickedIngredient = new Subject<Ingredient>();
  public sendCanDeleteIngredient = new Subject<boolean>();
  public sendCheckShouldResetFromAfterDelete = new Subject<Ingredient>();
  public updateIngredients = new Subject<Ingredient[]>();
  
  private clickedIngredient = null;
  private canDeleteIngredient = false;
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
        return this.ingredients[ingredientIndex].amount = ingredient.amount;
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
        else throw new Error('Invalid ingredient sent to ShoppingListComponent in addIngredients');
      }
    }
    else return
    this.sendUpdatedIngredients();
  }

  deleteIngredients() {
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

  clearIngredients(ingredients: HTMLUListElement) {
    const children = ingredients.querySelectorAll('a');
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLAnchorElement;
      if (child.localName !== 'a') break;
      child?.classList.remove('active');
    }
    this.clickedIngredient = null;
    this.sendClickedIngredient.next(null);
  }

  getCanDeleteIngredient() {
    return this.canDeleteIngredient;
  }

  getClickedIngredient() {
    return {...this.clickedIngredient};
  }

  sendUpdatedIngredients() {
    this.updateIngredients.next(this.ingredients.slice());
  }

  sendCheckShouldClearAfterDelete(ingredient: Ingredient) {
    this.sendCheckShouldResetFromAfterDelete.next(ingredient);
  }

  updateClickedIngredient(ingredient: Ingredient) {
    this.clickedIngredient = ingredient;
    this.sendClickedIngredient.next({...this.clickedIngredient});
  }

  updateCanDeleteIngredient(value) {
    this.canDeleteIngredient = value;
    this.sendCanDeleteIngredient.next(this.canDeleteIngredient);
  }
}
