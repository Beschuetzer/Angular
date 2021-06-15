import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { map, tap } from 'rxjs/operators';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as RecipeActions from '../recipes/store/recipes.actions';

export const firebaseProjectUrl =
    'https://recipe-shopping-list-7f4e4-default-rtdb.firebaseio.com';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private store: Store<AppState>,
  ) {}

  storeAllRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put(`${firebaseProjectUrl}/recipes.json`, recipes)
      .subscribe((response) => {
        console.log('saved response =', response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(`${firebaseProjectUrl}/recipes.json`)
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
          this.store.dispatch(new RecipeActions.SetRecipes(instantiatedRecipes));
        })
      );
  }
}
