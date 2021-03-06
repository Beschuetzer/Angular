import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private updateIngredientsSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.updateIngredientsSubscription = this.shoppingListService.updateIngredients.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  ngOnDestroy() {
    this.updateIngredientsSubscription.unsubscribe();
  }

  clickIngredient(e: Event, ingredientList: HTMLUListElement, clickedIngredient: Ingredient) {
    this.shoppingListService.clearIngredients(ingredientList);
    (e.target as HTMLAnchorElement)?.classList.toggle('active');
    this.shoppingListService.updateClickedIngredient(clickedIngredient);
    this.shoppingListService.updateCanDeleteIngredient(true);
  }

  onDeleteItemClick(ingredient: Ingredient) {
    this.shoppingListService.deleteIngredient(ingredient.name);
    this.shoppingListService.sendCheckShouldClearAfterDelete(ingredient);
  }
}
