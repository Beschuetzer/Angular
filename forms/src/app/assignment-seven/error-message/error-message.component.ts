import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {
  @Input() formControl: FormControl;
  @Input() controlName: string;
  @Input() nameToDisplay: string;

  get errorKeys() {
    return Object.keys(this.formControl.errors);
  }

  errorMessages = {
    name: {
      required: 'Project name is required',
      pattern: 'Project name must start with "Project-"',
      invalidName: 'is an invalid project name',
    },
    status: {

    },
    email: {
      required: 'Email is required',
      email: 'is an invalid Email',
    },
  }

  constructor() { }

  ngOnInit(): void {
  }

}
