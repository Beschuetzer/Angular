import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;

  get controls() {
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }

  constructor() { }

  ngOnInit(): void {
    //Initializing  and Configuring the form
    this.signUpForm = new FormGroup({
      //NOTE: using a string as a key to make sure that minification doesn't mess up the key
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, Validators.minLength(5)]),  //null = no default value
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
    });
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signUpForm.get('hobbies') as FormArray).push(control);
  }

  onRemoveHobby(index: number) {
    (this.signUpForm.get('hobbies') as FormArray).removeAt(index);
    // this.signUpForm.patchValue({
    //   "hobbies": newFormArray
    // })
    
  }

  onSubmit() {
    console.log('this.signUpForm =', this.signUpForm);
  }
}