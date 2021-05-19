import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,  
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
    console.log('this.allowEdit =', this.allowEdit);
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = +queryParams.allowEdit === 1 ? true : false;
      console.log('update edit------------------------------------------------');
      console.log('this.allowEdit =', this.allowEdit);
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
