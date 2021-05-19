import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None, 
})
export class AppComponent {
  public title: string = 'recipe-and-shopping-list';
  public clickedLink: string = 'recipes';

  handleLinkClick(linkName: string) {
    this.clickedLink = linkName;
  }
}
