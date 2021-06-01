import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { rootRoute } from './shared/constants';

const routes: Routes = [
  { path: '', redirectTo: `/${rootRoute}`, pathMatch: 'full' },
  {
    path: rootRoute,
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then((m) => m.ShoppingListModule),
  },
  // {path: '**', redirectTo: `/${rootRoute}`},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
