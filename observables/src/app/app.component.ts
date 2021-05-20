import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isActivated = false;
  activatedSubjectSubscription: Subscription;

  constructor(private usersService: UserService) {}

  ngOnInit() {
    this.usersService.activatedEmitter.subscribe((isActivated) => {
      this.isActivated = isActivated;
    })

    this.activatedSubjectSubscription = this.usersService.activatedSubjectEmitter.subscribe((isActivated) => {
      this.isActivated = isActivated;
    })
  }

  ngOnDestroy() {
    this.activatedSubjectSubscription.unsubscribe();
  }
}
