import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css']
})
export class OddComponent implements OnInit {
  message: string = 'Odd';
  @Input() counter: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

}
