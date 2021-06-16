import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/models/recipe.model';

export const SET_RECIPES = '[Recipe] SET_RECIPES';
export const FETCH_RECIPES = '[Recipe] FETCH_RECIPES';
export const ADD_RECIPE = '[Recipe] ADD_RECIPE';
export const UPDATE_RECIPE = '[Recipe] UPDATE_RECIPE';
export const DELETE_RECIPE = '[Recipe] DELETE_RECIPE';
export const STORE_RECIPES = '[Recipe] STORE_RECIPES';

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}
export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}
export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}
export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export type RecipeActions =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes
;
