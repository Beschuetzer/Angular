import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //NOTE: using a separate stylesheet
  // styleUrls: ['./app.component.css'],
  //NOTE: inline styles
  styles: [`
    h3 {
      color: black;
    }
  `]
})
export class AppComponent {
  title = 'first-app';


  handleEmitNumber(number: number) {
    console.log('number =', number);
  }
}
