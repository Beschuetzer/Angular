import { FormatWidth } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assignment-seven',
  templateUrl: './assignment-seven.component.html',
  styleUrls: ['./assignment-seven.component.css']
})
export class AssignmentSevenComponent implements OnInit {
  form: FormGroup;
  projectsStatuses = ['Critical', 'Stable', 'Finished'];
  invalidProjectNames = ['Project-Test'];

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
    this.form = new FormGroup({
      project: new FormGroup({
        name: new FormControl(
          'Project-',
          [
            Validators.required, Validators.pattern(/^project-.+/i)
          ],
          [
            this.getIsValidProjectName.bind(this),
          ]
        ),
        status: new FormControl(
          this.projectsStatuses[1],
          [
            Validators.required
          ],
        ),
      }),
      email: new FormControl(
        null,
        [
          Validators.email,
          Validators.required
        ],
      )
    });
  }

  getIsValidProjectName(formControl: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        for (let i = 0; i < this.invalidProjectNames.length; i++) {
          const invalidName = this.invalidProjectNames[i];
          if (invalidName === formControl.value) resolve({invalidName: true});
        }
        resolve(null);
      })
    })
    return promise;
  }

  getErrorKeys (componentPath: string) {
    const splitPath = componentPath.split('.');
    let controls = this.form.controls;
    let component;

    for (let i = 0; i < splitPath.length; i++) {
      const componentName = splitPath[i];
      
      if (i==0) component = controls[componentName];
      else component = component.controls[componentName];
    }

    if (component.errors) return Object.keys(component.errors);
    else return [];
  }

  onSubmitClick() {
    console.log('this.form =', this.form);
  }
}
