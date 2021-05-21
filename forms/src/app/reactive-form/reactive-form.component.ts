import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];

  errorMessages = {
    required: 'This field is required!',
    invalidName: 'is an invalid Username!',
    minlength: 'Username must be 4 characters long.',
    maxlength: 'Username must be 12 or fewer characters long.'
  }

  get controls() {
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }

  get usernameErrorKeys() {
    const errors = this.signUpForm.get('userData.username').errors;
    if (errors) return Object.keys(errors);
    return [];
  }

  constructor() { }

  ngOnInit(): void {
    //Initializing  and Configuring the form
    this.signUpForm = new FormGroup({
      //NOTE: using a string as a key to make sure that minification doesn't mess up the key
      'userData': new FormGroup({
        'username': new FormControl(
          null, 
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(12),
            this.getIsForbiddenName.bind(this)
          ]
        ),
        'email': new FormControl(
          null,
          [
            Validators.required,
            Validators.email,
          ],
          [
            this.getIsForbiddenEmail.bind(this),
          ],
        ),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
    });
    this.signUpForm.valueChanges.subscribe((valuesChanged) => {
      console.log('valuesChanged =', valuesChanged);
    })
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signUpForm.get('hobbies') as FormArray).push(control);
  }

  onRemoveHobby(index: number) {
    (this.signUpForm.get('hobbies') as FormArray).removeAt(index);
  }

  onSubmit() {
    this.signUpForm.reset({
      gender: 'male',
    })
  }

  //NOTE: This is a custom validator
  getIsForbiddenName(control: FormControl): {[s: string]: boolean} {
    for (let i = 0; i < this.forbiddenUserNames.length; i++) {
      const forbiddenUsername = this.forbiddenUserNames[i];
      if (forbiddenUsername === control.value)  {
        return {'invalidName': true};
      }
    }

    //NOTE: must pass null or omit return statement to tell Angular that the validator passes
    return null;
  }

  //NOTE: Async validator
  getIsForbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    console.log('control.value =', control.value);
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'invalidEmail': true});
        }
        else resolve(null);
      }, 1500)
    });
    return promise;
  }
}