import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private clickedRecipe: Recipe;
  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel',
      "A super-tasty schnitzel - just awesome!",
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('Frech Fries', 20)]
    ),
    new Recipe('Big Fat Burger',
      "What else is there to say?",
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 3), new Ingredient('Ketchup', 5)]
    ),
  ];
  updateClickedRecipe = new EventEmitter<Recipe>();

  constructor() {}


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

  setClickedRecipe(recipe: Recipe) {
    this.clickedRecipe = recipe;
    this.updateClickedRecipe.emit(this.clickedRecipe);
  }
}