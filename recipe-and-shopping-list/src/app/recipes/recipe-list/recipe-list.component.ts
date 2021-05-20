import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[];
  private recipesServiceSubscription: Subscription;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
    this.recipesServiceSubscription = this.recipesService.updateRecipes.subscribe((recipes) => {
      this.recipes = recipes;
    })
  }

  ngOnChanges() {
  }

  ngOnDestroy () {
    this.recipesServiceSubscription.unsubscribe();
  }

  handleNewClick() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
