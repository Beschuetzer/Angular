import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {
  @Input() formControl: FormControl;
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() nameToDisplay: string;

  get errorKeys() {
    if (this.formControl.errors)  return Object.keys(this.formControl.errors);
    else return [];
  }

  errorMessages = {
    name: {
      required: 'Ingredient name is required',
      invalidName: 'is an invalid Ingredient name',
    },
    amount: {
      required: 'An amount is required',
      min: 'Min is 1',
    },
  }

  constructor() { }

  ngOnInit(): void {
    this.formControl = this.form.controls[this.controlName] as FormControl;
  }

}
