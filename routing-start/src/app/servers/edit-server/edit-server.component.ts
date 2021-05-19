import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanDeactivateOutputTypes } from 'src/app/types';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,  
    private router: Router,
  ) { }

  ngOnInit() {
    this.server = this.serversService.getServer(+this.route.snapshot.params.id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params.id);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    })

    this.allowEdit = +this.route.snapshot.queryParams.allowEdit === 1 ? true : false;
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = +queryParams.allowEdit === 1 ? true : false;
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../', {relativeTo: this.route}]);
  }

  canDeactivate(): CanDeactivateOutputTypes {
    if (!this.allowEdit) return true;
    const wasChangeMade = this.serverName !== this.server.name || this.serverStatus !== this.server.status;
    if (wasChangeMade && !this.changesSaved) {
      return confirm('Do you want to discard the changes?')
    } else return true;
  }
}
