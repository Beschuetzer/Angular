import { Component } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { RecipesService } from "../recipes/recipes.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ],
})
export class HeaderComponent {
  collapsed = true;
  
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipesService,
  ) {}
  onSaveData() {
    console.log('saving------------------------------------------------');
    this.dataStorageService.storeAllRecipes();
  }

  onLoadData() {
    console.log('loading data------------------------------------------------');
    this.dataStorageService.fetchRecipes().subscribe((jsonRecipes: []) => {
      const instantiatedRecipes = this.recipesService.transformRecipes(jsonRecipes);
      this.recipesService.setRecipes(instantiatedRecipes);
    });;
  }
}


