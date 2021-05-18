import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user = {
      //NOTE: snapshot is ok for the initial load, but it won't when trying to load with different params than the initial params
      id: this.route.snapshot.params.id,
      name: "Some name",
    }

    //NOTE: Observables are used to subscribe to an event (handling asynchronous actions);  this.route.params is an Observable:
    //Note: this is only needed if the this component will be able to reload itself (that it is possible to reach this component when this compnent is reloaded)
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.user = {
        id: params.id,
        name: params.name ? params.name : 'some name',
      }
    })
    console.log('this.route =', this.route.snapshot.params.id);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}


