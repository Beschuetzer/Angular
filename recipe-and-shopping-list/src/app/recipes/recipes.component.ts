import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipesService } from '../services/recipes.service';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipeComponent implements OnInit {
  public clickedRecipe: Recipe;
  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.clickedRecipe = this.recipesService.clickedRecipe;
    this.recipesService.updateClickedRecipe.subscribe((clickedRecipe) =>{
      this.clickedRecipe = clickedRecipe;
    });
  }

  handleClickedRecipe (clickedRecipe: Recipe) {
    this.recipesService.setClickedRecipe(clickedRecipe);
  }
}
