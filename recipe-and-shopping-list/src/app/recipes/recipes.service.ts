import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  public sendNewRecipesSubject = new Subject<Recipe[]>();
  public sendDeletedIndexSubject = new Subject<number>();
  private clickedRecipe: Recipe;
  private recipes: Recipe[] = [
    // new Recipe(
    //   'Tasty Schnitzel',
    //   "A super-tasty schnitzel - just awesome!",
    //   'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //   [new Ingredient('Meat', 1), new Ingredient('Frech Fries', 20)]
    // ),
    // new Recipe(
    //   'Big Fat Burger',
    //   "What else is there to say?",
    //   'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    //   [new Ingredient('Buns', 2), new Ingredient('Meat', 3), new Ingredient('Ketchup', 5)]
    // ),
    // new Recipe(
    //   'Another Juicy Burger',
    //   "Very very tasty",
    //   'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    //   [new Ingredient('Buns', 2), new Ingredient('Meat', 3), new Ingredient('Ketchup', 5)]
    // ),
  ];

  constructor() {}

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.sendNewRecipes();
  }

  //Getter returning a copy 
  getClickedRecipe() {
    return {...this.clickedRecipe};
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  //Getter returning a copy 
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeIndex(recipe: Recipe) {
    if (!recipe) return -1;
    return this.recipes.findIndex(rec => rec.name === recipe.name);
  }

  getRecipesLength() {
    return this.recipes.length;
  }

  getUpdatedRecipes() {
    this.sendNewRecipes();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.sendNewRecipesSubject.next(this.recipes.slice());
    this.sendDeletedIndexSubject.next(index);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.sendNewRecipes();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.sendNewRecipesSubject.next(this.recipes.slice());
  }

  private sendNewRecipes() {
    this.sendNewRecipesSubject.next(this.recipes.slice());
  }
}
