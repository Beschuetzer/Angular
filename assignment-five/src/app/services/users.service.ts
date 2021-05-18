import { Injectable } from '@angular/core';
import { CounterService } from './counter.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];
  constructor(private counterService: CounterService) {}

  setToInactive(index: number) {
    const removed = this.activeUsers.splice(index, 1);
    this.inactiveUsers.push(removed[0]);
    console.log(this.counterService.incrementActiveToInactive());
  }

  setToActive(index: number) {
    const removed = this.inactiveUsers.splice(index, 1);
    this.activeUsers.push(removed[0]);
    console.log(this.counterService.incrementInactiveToActive());
  }
}
