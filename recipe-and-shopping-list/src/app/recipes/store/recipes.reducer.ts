import { Recipe } from "src/app/models/recipe.model";
import { Action } from '@ngrx/store';
import * as RecipeActions from './recipes.actions';

export interface State {
  recipes: Recipe[],
}

const INITIAL_STATE = {
  recipes: [],
}

export function recipeReducer (state = INITIAL_STATE, action: RecipeActions.RecipeActions) {
  switch(action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      }
    default:
      return state;
  }

}