import { EventEmitter, Injectable, Output } from '@angular/core';

import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  public clickedRecipe: Recipe;
  public recipes: Recipe[] = [
    new Recipe('Test', "This is a test recipe.  delete in final", 'https://live.staticflickr.com/121/304786709_5648e5ef61_b.jpg', []),
    new Recipe('Test2', "This is another recipe.  delete in final", 'https://live.staticflickr.com/121/304786709_5648e5ef61_b.jpg', []),
  ];
  @Output() updateClickedRecipe = new EventEmitter<Recipe>();

  constructor() {}

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  setClickedRecipe(recipe: Recipe) {
    this.clickedRecipe = recipe;
    this.updateClickedRecipe.emit(this.clickedRecipe);
  }
}
