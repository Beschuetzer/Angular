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
  @Output() emitClickedLinkName = new EventEmitter<string>();

  handleLinkClick(e: Event, linkName: string) {
    e.preventDefault();
    this.emitClickedLinkName.emit(linkName);
  }
}


