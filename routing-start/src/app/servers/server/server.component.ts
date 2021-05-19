import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  paramsSubscription: Subscription;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,  
    private router: Router,
  ) {}

  ngOnInit() {
    //Note: using a resolver
    this.route.data.subscribe((data) => {
      this.server = data.server;
    })

    //Note: If not using a resolver to get the server data
    // this.server = this.serversService.getServer(+this.route.snapshot.params.id);
    // this.paramsSubscription = this.route.params.subscribe((params) => {
    //   this.server = this.serversService.getServer(+params.id);
    // })
  }

  ngOnDestroy() {
    // this.paramsSubscription.unsubscribe();
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'merge'});
  }
}
