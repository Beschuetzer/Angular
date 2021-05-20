import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  customObservableSubscription: Subscription;
  customObservableUsingPipeSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    const customObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        if (count % 3 === 0 && count > 0) {
          //(send error package (doesn't call completion handler); handled as 2nd arg in subscribe)
          observer.error(new Error('Error!'))
        }

        //completes the stream which ends it (callback is third argument in subscribe)
        if (count === 2) observer.complete();

        //next omits a new value/data package to be handled (1st arg in subscribe)
        observer.next(count++)
      }, 1000)

      //throws an error package
      // observer.error()

      //send completion package
      // observer.complete()
    });
    
    //using rxjs operators to perform operations on the data then to subscribe to the resultant data (there are a lot of operators)
    this.customObservableUsingPipeSubscription = customObservable.pipe(filter(data => data > 0),
    map(data => {
      return 'Round: ' + (+data);
    })).subscribe((msg) => {
      console.log('msg =', msg);
    });

    this.customObservableSubscription = customObservable.subscribe((count) => {
      console.log('count =', count);
    }, error => {
      console.log('error =', error);
      alert(error.message);
    }, () => {
      console.log('completion!------------------------------------------------');
    })
  }

  ngOnDestroy() {
    this.customObservableSubscription.unsubscribe();
    this.customObservableUsingPipeSubscription.unsubscribe();
  }

}
