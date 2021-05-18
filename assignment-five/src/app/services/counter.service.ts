import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  public activeToInactiveCount: number = 0;
  public inactiveToActiveCount: number = 0;

  incrementActiveToInactive() {
    return ++this.activeToInactiveCount;
  }

  incrementInactiveToActive() {
    return ++this.inactiveToActiveCount;
  }
}
