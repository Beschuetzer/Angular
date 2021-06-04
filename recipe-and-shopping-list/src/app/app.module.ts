import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthIntercepterService } from './auth/auth-intercepter.service';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(appReducer),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthIntercepterService,
      multi: true, //telling angular you have multiple interceptors
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
