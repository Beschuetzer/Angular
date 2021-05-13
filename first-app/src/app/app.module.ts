import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';

@NgModule({
  //NOTE: anytime you add a new component, you need to tell angular about it by putting it in the providers array
  declarations: [
    AppComponent,
    ServerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
