
import { Ingredient } from "../../models/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number,
}

const INITIAL_STATE: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Oranges', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(state = INITIAL_STATE, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {...state, ingredients: [...state.ingredients,action.payload]};
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      }
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredientToEdit = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredientToEdit,
        ...action.payload.ingredient,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => index !== action.payload)
      }

    default:
      return state;
  }
}