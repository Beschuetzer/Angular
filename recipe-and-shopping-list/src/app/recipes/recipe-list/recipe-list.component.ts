import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[];
  private getNewRecipesSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  handleNewClick() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnInit(): void {
    this.getNewRecipesSubscription = this.store.select('recipes').subscribe(recipeState => {
      this.recipes = recipeState.recipes;
      console.log('this.recipes =', this.recipes);
    })
  }

  ngOnChanges() {
  }

  ngOnDestroy () {
    this.getNewRecipesSubscription.unsubscribe();
  }

}
