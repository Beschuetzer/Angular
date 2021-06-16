import { Recipe } from "src/app/models/recipe.model";
import * as RecipeActions from './recipes.actions';

export interface State {
  recipes: Recipe[],
}

const INITIAL_STATE = {
  recipes: null,
}

export function recipeReducer (state = INITIAL_STATE, action: RecipeActions.RecipeActions) {
  let recipes: Recipe[];
  switch(action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      }
    case RecipeActions.ADD_RECIPE:
      recipes = [...state.recipes];
      recipes.push(action.payload);
      return {
        ...state,
        recipes,
      }
    case RecipeActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe,
      }
      recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: [...recipes],
      }
    case RecipeActions.DELETE_RECIPE:
      recipes = [...state.recipes];
      const recipesAfterDeletion = recipes.splice(action.payload, 1);

      return {
        ...state,
        recipes: recipesAfterDeletion,
      }
    default:
      return state;
  }

}