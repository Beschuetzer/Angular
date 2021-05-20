import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signUpForm: NgForm;
  defaultQuestion = "pet";
  answer = "";
  genders = ['Male', 'Female'];
  submitted = false;

  user = {
    username: '',
    email: '',
    secret: '',
    questionAnswer: '',
    gender: '',
  }
  
  suggestUsername() {
    const suggestedName = 'Superuser';
    this.signUpForm.form.patchValue({
      userData: {
        username: suggestedName,
      }
    })
  }

  // onSubmit(form: HTMLFormElement) {
  //   //NOTE: form.value is the JS object for each control in the template
  //   console.log('form.value =', form.value);
  // }

  onSubmit() {
    //NOTE: accessing signUpForm from local ref and @ViewChild
    this.user.username = this.signUpForm.form.value.userData.username;
    this.user.email = this.signUpForm.form.value.userData.email;
    this.user.secret = this.signUpForm.form.value.secret;
    this.user.questionAnswer = this.signUpForm.form.value.questionAnswer;
    this.user.gender = this.signUpForm.form.value.gender;

    this.submitted = true;
  }
}
