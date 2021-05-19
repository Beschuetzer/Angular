import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipesService } from './recipes.service';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  public clickedRecipe: Recipe;
  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.clickedRecipe = this.recipesService.getClickedRecipe();
    this.recipesService.updateClickedRecipe.subscribe((clickedRecipe: Recipe) =>{
      this.clickedRecipe = clickedRecipe;
    });
  }

  handleClickedRecipe (clickedRecipe: Recipe) {
    this.recipesService.setClickedRecipe(clickedRecipe);
  }
}
