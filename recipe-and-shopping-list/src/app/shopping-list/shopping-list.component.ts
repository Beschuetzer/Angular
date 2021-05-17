import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Oranges', 10),
  ];
  constructor() { }

  ngOnInit(): void {
  }

  hanldeNewIngredient(ingredient: Ingredient) {
    console.log('ingredient =', ingredient);
    if (ingredient instanceof Ingredient) this.ingredients.push(ingredient);
    else throw new Error('Invalid new ingredient in ShoppingListComponent hanldeNewIngredient');
  }

}
