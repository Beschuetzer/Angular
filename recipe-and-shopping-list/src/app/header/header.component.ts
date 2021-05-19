import { Component, Output, EventEmitter } from "@angular/core";
import { LinkNames } from '../models/enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ],
})
export class HeaderComponent {
  collapsed = true
}


