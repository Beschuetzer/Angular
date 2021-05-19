import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Server } from 'src/app/types';
import { ServersService } from '../servers.service';

@Injectable({
  providedIn: 'root'
})
export class ServerResolverService implements Resolve<Server> {
  constructor(
    private serversService: ServersService,
  ) {}

  //NOTE: resolvers are executed each time a route is hit (unlike components, which are only instantiated once then updated on re-visits); therefore no need to subscribe to an observable
  resolve(
    routeSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Server> | Promise<Server> | Server {
    //NOTE: fetch the data asynchronously here...
    return this.serversService.getServer(+routeSnapshot.params.id);
  }
}
