import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signUpForm: NgForm;
  
  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // onSubmit(form: HTMLFormElement) {
  //   //NOTE: form.value is the JS object for each control in the template
  //   console.log('form.value =', form.value);
  // }

  onSubmit() {
    //NOTE: accessing signUpForm from local ref and @ViewChild
    console.log('this.signUpForm =', this.signUpForm);
  }
}
