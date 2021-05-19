import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CanDeactivateOutputTypes as CanActivateOutputTypes } from './types';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,    
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CanActivateOutputTypes {

    return this.authService.isAuthenticated()
    .then((isAuthenticated: boolean) => {
      if (!isAuthenticated) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    })
  }

  canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CanActivateOutputTypes {
    return this.canActivate(route, state)
  }
}
