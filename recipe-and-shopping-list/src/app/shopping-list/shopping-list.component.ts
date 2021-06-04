import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[]}>;
  // private updateIngredientsSubscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>,
    ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy() {
    // this.updateIngredientsSubscription.unsubscribe();
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
