import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../recipes.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipesService: RecipesService,
    private route: ActivatedRoute,  
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipe = this.recipesService.getRecipe(+params.id);
    });
  }

  handleIngredientsToShoppingList(e: Event) {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  handleDeleteClick() {
    const deletedRecipe = this.recipesService.deleteRecipe(this.recipe.id);
    this.recipesService.getUpdatedRecipes();
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
