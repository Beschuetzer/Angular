import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/models/recipe.model';

export const SET_RECIPES =  '[Recipe] SET_RECIPES';
export const FETCH_RECIPES =  '[Recipe] FETCH_RECIPES';

export class SetRecipes implements Action{
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export type RecipeActions = SetRecipes | FetchRecipes;