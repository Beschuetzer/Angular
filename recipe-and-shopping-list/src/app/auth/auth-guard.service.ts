//runs before ngOnInit();  useful for auth and pre route loading stuff
//put into a new service file
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppState } from '../store/app.reducer';
import { AuthService } from './auth.service';

export type CanActivateOutputTypes =
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | UrlTree
  | boolean;

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): CanActivateOutputTypes {
    //userSubject is a BehaviorSubject initialized to be null
    //this returns the truthiness of the observable at the time of calling this function (no subscribing necessary)
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) return true;
        else return this.router.createUrlTree(['/auth']);
      })
      //this allows you to redirect based on above condition in map (but newer more reliabe method is to use route.createUrlTree())
      // tap((isAuthenticated) => {
      //   if (!isAuthenticated) this.router.navigate(['/auth']);
      // })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): CanActivateOutputTypes {
    return this.canActivate(route, state);
  }
}
