import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, take, map } from 'rxjs/operators';
import { AppState } from '../store/app.reducer';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthIntercepterService implements HttpInterceptor {
  constructor(
    private store: Store<AppState>,  
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user
      }),
      exhaustMap((user) => {
        if (!user) return next.handle(req);

        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.id),
        });

        console.log('modifiedReq =', modifiedReq);
        return next.handle(modifiedReq);
      })
    );
  }
}
