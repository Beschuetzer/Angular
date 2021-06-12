import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None, 
})
export class AppComponent implements OnInit{
  constructor(
    private appService: AppService,
  ) {}
  
  ngOnInit() {
    this.appService.loginViaLocalStorage();
  }
}
