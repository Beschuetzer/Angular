import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[];
  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    console.log('oninit------------------------------------------------');
    this.recipes = this.recipesService.getRecipes();
    this.recipesService.updateRecipes.subscribe((recipes) => {
      this.recipes = recipes;
    })
  }

  ngOnChanges() {
    console.log('onchanges------------------------------------------------');
  }

  handleRecipeClick(recipe: Recipe) {
    this.recipesService.setClickedRecipe(recipe);
  }

  handleNewClick() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
