import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private clickedRecipe: Recipe;
  private recipes: Recipe[] = [
    new Recipe('Test', "This is a test recipe.  delete in final", 'https://live.staticflickr.com/121/304786709_5648e5ef61_b.jpg', []),
    new Recipe('Test2', "This is another recipe.  delete in final", 'https://live.staticflickr.com/121/304786709_5648e5ef61_b.jpg', []),
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
