import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
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

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      debugger;
      return this.http
        .put(`${firebaseProjectUrl}/recipes.json`, recipesState.recipes)        
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>,
    private recipesService: RecipesService
  ) {}
}
