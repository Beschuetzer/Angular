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
  id: number;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipesService: RecipesService,
    private route: ActivatedRoute,  
    private router: Router,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (!this.recipesService.getIsValidId(+this.id)) return this.router.navigate(['/recipes']);
    this.route.params.subscribe((params) => {
      this.recipe = this.recipesService.getRecipe(+params.id);
      this.id = +params.id;
    });
  }

  handleIngredientsToShoppingList(e: Event) {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  handleDeleteClick() {
    const deletedRecipe = this.recipesService.deleteRecipe(this.id);
    this.recipesService.getUpdatedRecipes();
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
