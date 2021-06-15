import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../../models/recipe.model';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
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
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {

    this.store
      .select('recipes')
      .pipe(
        take(1),
        map((recipeState) => {
          return recipeState.recipes.findIndex((recipe, index) => {
            return this.index === index;
          });
        })
      )
      .subscribe((recipeIndex) => {
        this.recipeId = recipeIndex;
      });

    this.getIndexOfDeletedRecipeSubscription =
      this.recipesService.sendDeletedIndexSubject.subscribe((deletedIndex) => {
        if (deletedIndex < this.recipeId) this.recipeId--;
      });
  }

  ngOnDestroy() {
    this.getIndexOfDeletedRecipeSubscription.unsubscribe();
  }

  handleClick(recipe: Recipe) {
    this.router.navigate([this.index], { relativeTo: this.route });
  }
}
