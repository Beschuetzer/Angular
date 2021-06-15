import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterState, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { AppState } from '../store/app.reducer';
import { RecipesService } from './recipes.service';
import { Store } from '@ngrx/store';
import * as RecipeActions from './store/recipes.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(
    private dataStorage: DataStorageService,
    private recipesService: RecipesService,
    private store: Store<AppState>,
    private action$: Actions,
  ) {}

  resolve(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot,
  ) {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0) {
      // this.dataStorage.fetchRecipes().subscribe(data => {});

      //NOTE: This returns an observable
      // return this.dataStorage.fetchRecipes();
      
      //dispatching does not
      this.store.dispatch(new RecipeActions.FetchRecipes());

      //We can use ngrx/effect Actions and ofType to return an observable when the SetRecipes action is dispatched
      //basically resolver dispatches then waits for another action to be dispatched and then returns the one time observable (resolvers must return observables or data)
      return this.action$.pipe(ofType(RecipeActions.SET_RECIPES), take(1))
    } else return recipes;
  }
}

