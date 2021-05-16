import { Component, ElementRef, ViewChild, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @ViewChild('startButton') startButton: ElementRef;
  @ViewChild('stopButton') stopButton: ElementRef;
  @Output() emitNumber = new EventEmitter<number>();
  public intervalRef: any;
  @Input() counter: number = 0;

  constructor() { }

  handleStartButtonClick(e: Event) {
    console.log('start------------------------------------------------');
    this.intervalRef = setInterval(() => {
      this.emitNumber.emit(this.counter)
      this.counter +=1 ;
    }, 1000)
  }

  handleStopButtonClick(e: Event) {
    console.log('stop------------------------------------------------');
    console.log('this.intervalRef =', this.intervalRef);
    clearInterval(this.intervalRef);
  }
}
