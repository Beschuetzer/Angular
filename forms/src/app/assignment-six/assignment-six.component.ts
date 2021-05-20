import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-assignment-six',
  templateUrl: './assignment-six.component.html',
  styleUrls: ['./assignment-six.component.css']
})
export class AssignmentSixComponent implements OnInit {
  @ViewChild('form2') form: NgForm;
  subscriptionTypes = ['Basic', 'Advanced', 'Pro'];
  subscriptionDefault = this.subscriptionTypes[1];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('this.form.controls =', this.form.controls);
  }
}
