import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AssignmentSixComponent } from './assignment-six/assignment-six.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { AssignmentSevenComponent } from './assignment-seven/assignment-seven.component';

@NgModule({
  declarations: [
    AppComponent,
    AssignmentSixComponent,
    ReactiveFormComponent,
    AssignmentSevenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
