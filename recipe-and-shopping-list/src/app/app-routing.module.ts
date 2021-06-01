import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { rootRoute } from './shared/constants';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


const routes: Routes = [
  {path: '', redirectTo: `/${rootRoute}`, pathMatch: 'full'},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent},
  // {path: '**', redirectTo: `/${rootRoute}`},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
