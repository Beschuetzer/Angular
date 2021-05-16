import { ThisReceiver } from '@angular/compiler';
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
  public oddNumbers: number[] = [];
  public evenNumbers: number[] = [];

  handleEmitNumber(number: number) {
    if (number % 2 === 0) this.evenNumbers.push(number)
    else this.oddNumbers.push(number);
    console.log('this.oddNumbers =', 
    this.oddNumbers);
    console.log('this.evenNumbers =', this.evenNumbers);
  }
}
