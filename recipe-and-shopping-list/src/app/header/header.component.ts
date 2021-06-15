import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipes.actions';
import { User } from '../models/user.model';
import { RecipesService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  userObjSubscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipesService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.userObjSubscription = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user: User) => {
        this.isAuthenticated = user?.token ? true : false;
      });
  }

  ngOnDestroy() {
    this.userObjSubscription.unsubscribe();
  }

  onSaveData() {
    console.log('saving------------------------------------------------');
    this.dataStorageService.storeAllRecipes();
  }

  onLoadData() {
    console.log('loading data------------------------------------------------');
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout())
  }
}
