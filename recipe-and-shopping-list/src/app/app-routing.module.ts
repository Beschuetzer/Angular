import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { rootRoute } from './shared/constants';

const routes: Routes = [
  { path: '', redirectTo: `/${rootRoute}`, pathMatch: 'full' },
  {
    path: rootRoute,
    loadChildren: () =>
      import('./recipes/recipes.module').then((importedModule) => importedModule.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then((importedModule) => importedModule.ShoppingListModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((importedModule) => importedModule.AuthModule),
  },
  // {path: '**', redirectTo: `/${rootRoute}`},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
