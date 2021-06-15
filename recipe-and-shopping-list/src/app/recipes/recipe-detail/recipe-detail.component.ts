import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../recipes.service';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    //NOTE: using separate observable pipes
    this.id = this.route.snapshot.params.id;
    if (!this.recipesService.getIsValidId(+this.id)) return this.router.navigate(['/recipes']);
    this.route.params.subscribe((params) => {
      this.id = +params.id;
      this.store.select('recipes').pipe(map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return this.id === index;
        })
      })).subscribe(recipe => {
        this.recipe = recipe;
      })
    });

    //NOTE: combining two separate observable pipes into one
    // this.route.params
    //   .pipe(
    //     map((routeParams) => {
    //       //map allows you to change what data is passed on to the next part of the pipe (and all sub-sequent methods/parts)
    //       return +routeParams.id;
    //     }),
    //     exhaustMap((id) => {
    //       this.id = id;

    //       //exhaust map requires you to return a different observable
    //       return this.store.select('recipes');
    //     }),
    //     map((recipeState) => {
    //       return recipeState.recipes.find((recipe, index) => index === this.id);
    //     })
    //   )
    //   .subscribe((recipe) => {
    //     this.recipe = recipe;
    //   });
  }

  handleIngredientsToShoppingList(e: Event) {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  handleDeleteClick() {
    const deletedRecipe = this.recipesService.deleteRecipe(this.id);
    this.recipesService.getUpdatedRecipes();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
