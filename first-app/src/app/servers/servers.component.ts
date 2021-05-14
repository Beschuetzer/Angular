import { Component, OnInit } from '@angular/core';

@Component({
  //there are multiple ways to trigger instantiation of a component hover selector to see them all
  selector: 'app-servers',
  //Warning: need either template or templateUrl (one must be present; similar to how React components require you return some JSX)
  //NOTE: using a separate file:
  templateUrl: './servers.component.html',
  //NOTE: inline Template (use if less than 5ish lines of html in template):
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>
  // `,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'no server was created';
  serverName = '';
  serverCreated = false;

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {
  }

  onCreateServer = (e: Event) => {
    this.serverCreationStatus = `Server was created as ${this.serverName}`;
    this.serverCreated = true;
  }

  onUpdateServerName(e: InputEvent) {
    this.serverName = (e.target as HTMLInputElement).value;
  }

}
