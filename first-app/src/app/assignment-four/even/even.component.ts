import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css']
})
export class EvenComponent implements OnInit {
  message: string = 'Even';
  @Input() counter: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

}
