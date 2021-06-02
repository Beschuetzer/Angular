import { Action } from "@ngrx/store";
import { Ingredient } from "../models/ingredient.model";
import * as ShoppingListActions from "./store/shopping-list.actions";

const INITIAL_STATE = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Oranges', 10),
  ],
};

export function shoppingListReducer(state = INITIAL_STATE, action: ShoppingListActions.addIngredient) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {...state, ingredients: [...state.ingredients,action.payload]};
    default:
      return state;
  }
}