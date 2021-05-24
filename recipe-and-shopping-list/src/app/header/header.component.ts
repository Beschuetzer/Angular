import { Component, Output, EventEmitter } from "@angular/core";
import { LinkNames } from '../models/enums';
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ],
})
export class HeaderComponent {
  collapsed = true;
  
  constructor(
    private dataStorageService: DataStorageService,
  ) {}
  onSaveData() {
    console.log('saving------------------------------------------------');
    this.dataStorageService.storeAllRecipes();
  }

  onLoadData() {
    console.log('loading data------------------------------------------------');
    this.dataStorageService.fetchRecipes();
  }
}


