import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { plainToClass } from 'class-transformer';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private firebaseProjectUrl =
    'https://recipe-shopping-list-7f4e4-default-rtdb.firebaseio.com';
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService
  ) {}

  storeAllRecipes() {
    const recipes = this.recipesService.getRecipes();

    this.http
      .put(`${this.firebaseProjectUrl}/recipes.json`, recipes)
      .subscribe((response) => {
        console.log('savedresponse =', response);
      });
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(`${this.firebaseProjectUrl}/recipes.json`)
      .subscribe((jsonRecipes) => {
        const instantiatedRecipes = plainToClass(Recipe, jsonRecipes);

        for (let i = 0; i < instantiatedRecipes.length; i++) {
          const recipe = instantiatedRecipes[i];
          recipe.ingredients = plainToClass(Ingredient, recipe.ingredients);
        }

        this.recipesService.setRecipes(instantiatedRecipes);
      });
  }
}
