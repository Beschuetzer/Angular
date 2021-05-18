import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ) {}

  ngOnInit() {
    this.server = this.serversService.getServer(+this.route.snapshot.params.id);
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.server = this.serversService.getServer(+params.id);
    })
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
