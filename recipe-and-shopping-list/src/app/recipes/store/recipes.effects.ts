import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { plainToClass } from 'class-transformer';
import { map, switchMap, tap } from 'rxjs/operators';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { firebaseProjectUrl } from 'src/app/shared/data-storage.service';
import { AppState } from 'src/app/store/app.reducer';
import * as RecipeActions from './recipes.actions';
import { RecipesService } from '../recipes.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(`${firebaseProjectUrl}/recipes.json`);
    }),
    map((jsonRecipes) => {
      return jsonRecipes.map((recipe) => {
        if (recipe.ingredients) return recipe;
        return { ...recipe, ingredients: [] };
      });
    }),
    map((jsonRecipes: []) => {

      //storing recipes in
      const instantiatedRecipes =
        this.recipesService.transformRecipes(jsonRecipes);
      this.store.dispatch(new RecipeActions.SetRecipes(instantiatedRecipes));
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>,
    private recipesService: RecipesService
  ) {}
}
