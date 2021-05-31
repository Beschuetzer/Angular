import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../models/recipe.model";
import { User } from "../models/user.model";
import { RecipesService } from "../recipes/recipes.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  userObjSubscription: Subscription;
  
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipesService,
    private authService: AuthService,
  ) {}

  ngOnInit () {
    this.userObjSubscription = this.authService.userSubject.subscribe((userObj: User) => {
      this.isAuthenticated = userObj?.token ? true : false;
    })
  }

  ngOnDestroy () {
    this.userObjSubscription.unsubscribe();
  }

  onSaveData() {
    console.log('saving------------------------------------------------');
    this.dataStorageService.storeAllRecipes();
  }

  onLoadData() {
    console.log('loading data------------------------------------------------');
    this.dataStorageService.fetchRecipes().subscribe((jsonRecipes: []) => {
      const instantiatedRecipes = this.recipesService.transformRecipes(jsonRecipes);
      this.recipesService.setRecipes(instantiatedRecipes);
    });;
  }
}


