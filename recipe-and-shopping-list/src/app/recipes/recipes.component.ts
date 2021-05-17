import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipeComponent implements OnInit {
  public clickedRecipe: Recipe;
  constructor() { }

  ngOnInit(): void {
  }

  handleClickedRecipe (clickedRecipe: Recipe) {
    this.clickedRecipe = clickedRecipe;
    console.log('clickedRecipe 2 =', this.clickedRecipe);
  }
}
