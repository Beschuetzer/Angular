import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private clickedRecipe: Recipe;
  private recipes: Recipe[] = [
    new Recipe(
      0,
      'Tasty Schnitzel',
      "A super-tasty schnitzel - just awesome!",
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('Frech Fries', 20)]
    ),
    new Recipe(
      1,
      'Big Fat Burger',
      "What else is there to say?",
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 3), new Ingredient('Ketchup', 5)]
    ),
  ];
  updateRecipes = new Subject<Recipe[]>();

  constructor() {}

  getRecipe(index: number) {
    return this.recipes[index];
  }

  //Getter returning a copy 
  getRecipes() {
    return this.recipes.slice();
  }

  //Getter returning a copy 
  getClickedRecipe() {
    return {...this.clickedRecipe};
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  getUpdatedRecipes() {
    this.updateRecipes.next(this.recipes);
  }

  deleteRecipe(index: number) {
    return this.recipes.splice(index, 1);
  }
}
