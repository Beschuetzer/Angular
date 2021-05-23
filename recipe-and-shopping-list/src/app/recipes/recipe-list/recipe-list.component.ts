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
  private getNewRecipesSubscription: Subscription;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleNewClick() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
    this.subscribeToSubjects();
  }

  ngOnChanges() {
  }

  ngOnDestroy () {
    this.getNewRecipesSubscription.unsubscribe();
  }

  private subscribeToSubjects() {
    this.getNewRecipesSubscription = this.recipesService.sendNewRecipesSubject.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
