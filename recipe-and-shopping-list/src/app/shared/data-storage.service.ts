import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private firebaseProjectUrl =
    'https://recipe-shopping-list-7f4e4-default-rtdb.firebaseio.com';

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService
  ) {}

  storeAllRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put(`${this.firebaseProjectUrl}/recipes.json`, recipes)
      .subscribe((response) => {
        console.log('saved response =', response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(`${this.firebaseProjectUrl}/recipes.json`)
      .pipe(
        map((jsonRecipes) => {
          //making sure that ingredients property is set
          return jsonRecipes.map((recipe) => {
            if (recipe.ingredients) return recipe;
            return { ...recipe, ingredients: [] };
          });
        }),
        //tap allows you to execute code in-line without modifying anything
        tap((jsonRecipes: []) => {
          //storing recipes in
          const instantiatedRecipes =
            this.recipesService.transformRecipes(jsonRecipes);
          this.recipesService.setRecipes(instantiatedRecipes);
        })
      );
  }
}
