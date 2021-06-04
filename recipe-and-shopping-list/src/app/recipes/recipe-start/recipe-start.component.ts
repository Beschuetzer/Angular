import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.scss']
})
export class RecipeStartComponent implements OnInit, OnDestroy {
  recipesLength: number;
  recipesSub: Subscription;

  constructor(
    private recipesService: RecipesService,
    private dataStorageService: DataStorageService,
  ) { }

  ngOnInit(): void {
    this.recipesLength = this.recipesService.getRecipesLength();
  }
  ngOnDestroy () {
    if(this.recipesSub) this.recipesSub.unsubscribe();
  }

  onLoadRecipes() {
    this.recipesSub = this.dataStorageService.fetchRecipes().subscribe();
    this.recipesLength = 1;
  }

}
