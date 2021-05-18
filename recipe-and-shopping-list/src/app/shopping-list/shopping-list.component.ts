import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.updateIngredients.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  hanldeNewIngredientClick(ingredient: Ingredient) {
    this.shoppingListService.addIngredient(ingredient);
  }
}
