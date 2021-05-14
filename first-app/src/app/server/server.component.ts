import { Component } from "@angular/core";



enum serverStatuses {online = 'Online', offline = 'Offline'}
enum serverStatusColors {online = 'green', offline = 'red'}

@Component({
  //selector is the tag by which you can use the component in templates (.html files); should be unique starting with 'app-'
  selector: 'app-server',
  templateUrl: './server.component.html',
  // styleUrls: [
  //   './server.component.css',
  // ],
  styles: [`
    .online {
      color: white;
    }
  `]
})
export class ServerComponent {
  serverId = -1;
  serverStatus = '';
  serverName =  '';

  constructor() {
    const random = Math.random();
    if (random >= .5) this.serverStatus = serverStatuses.offline;
    else this.serverStatus = serverStatuses.online;
    this.serverId = Math.round(random * 100);
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor() {
    if (this.serverStatus === serverStatuses.offline) return serverStatusColors.offline
    else return serverStatusColors.online;
  }

  getDisplayOnline() {
    console.log('call------------------------------------------------');
    return this.serverStatus === serverStatuses.online;
  }
}