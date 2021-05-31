import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterState, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(
    private dataStorage: DataStorageService,
    private recipesService: RecipesService,
  ) {}

  resolve(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot,
  ) {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0) {
      // this.dataStorage.fetchRecipes().subscribe(data => {});
      return this.dataStorage.fetchRecipes();
    } else return recipes;
  }
}

