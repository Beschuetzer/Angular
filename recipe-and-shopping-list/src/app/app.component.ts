import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None, 
})
export class AppComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
  ) {}
  
  ngOnInit() {
    const isLoginSuccessful = this.authService.autoLogin();
    if (isLoginSuccessful) this.dataStorageService.fetchRecipes().subscribe(data => {});
  }
}
