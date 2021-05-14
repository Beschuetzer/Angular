import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment-three',
  templateUrl: './assignment-three.component.html',
  styleUrls: ['./assignment-three.component.css']
})
export class AssignmentThreeComponent implements OnInit {
  shouldDisplayParagraph = true;
  timeStamps: string[] = [];
  assignmentName = 'Assignment Three';

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick(e: Event) {
    this.timeStamps.push(new Date().toISOString());
    this.shouldDisplayParagraph = !this.shouldDisplayParagraph;
  }

  getIsFifthPlusItem(timeStamp) {
    console.log('timeStamp =', timeStamp);
    return this.timeStamps.findIndex(ts => ts === timeStamp) >= 4;
  }

}
