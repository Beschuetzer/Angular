import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { Recipe } from '../../models/recipe.model';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit, OnDestroy {
  @Input() index: number;
  @Input() recipe: Recipe;
  recipeId: number;
  getIndexOfDeletedRecipeSubscription: Subscription;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.recipeId = this.recipesService.getRecipeIndex(this.recipe);
    this.getIndexOfDeletedRecipeSubscription = this.recipesService.sendDeletedIndexSubject.subscribe((deletedIndex) => {
      if (deletedIndex < this.recipeId) this.recipeId--;
    });
  }

  ngOnDestroy() {
    this.getIndexOfDeletedRecipeSubscription.unsubscribe();
  }

  handleClick(recipe: Recipe) {
    const recipeIndex = this.recipesService.getRecipeIndex(recipe);
    this.router.navigate([recipeIndex], {relativeTo: this.route})
  }
}
