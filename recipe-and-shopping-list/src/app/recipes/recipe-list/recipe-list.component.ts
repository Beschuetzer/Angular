import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[];
  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
  }

  handleRecipeClick(recipe: Recipe) {
    this.recipesService.setClickedRecipe(recipe);
  }
}
