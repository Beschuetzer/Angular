import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // public inactiveusers: string[] = [];
  // public activeusers: string[] = [];
  // constructor(private usersService: UsersService){}

  // ngOnInit() {
  //   this.inactiveusers = this.usersService.inactiveUsers;
  //   this.activeusers = this.usersService.activeUsers;
  // }
}
