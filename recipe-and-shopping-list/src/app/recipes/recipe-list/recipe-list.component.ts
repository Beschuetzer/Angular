import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Output() emitClickedRecipe = new EventEmitter<Recipe>();
  public recipes: Recipe[] = [
    new Recipe('Test', "This is a test recipe.  delete in final", 'https://live.staticflickr.com/121/304786709_5648e5ef61_b.jpg', [])
  ];
  constructor() { }

  ngOnInit(): void {
  }

  handleRecipeClick(recipe: Recipe) {
    this.emitClickedRecipe.emit(recipe);
  }
}
