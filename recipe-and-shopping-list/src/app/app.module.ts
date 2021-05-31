import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './directives/dropdown.directive';
import { DropdownGlobalDirective } from './directives/dropdown-global.directive';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component'
import { ErrorMessageComponent } from './shopping-list/error-message/error-message.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthIntercepterService } from './auth/auth-intercepter.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    DropdownDirective,
    DropdownGlobalDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    ErrorMessageComponent,
    AuthComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthIntercepterService,
      multi: true, //telling angular you have multiple interceptors
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
