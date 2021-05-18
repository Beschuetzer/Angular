import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [
  ],
})
export class AccountComponent {
  @Input() account: {name: string, status: string} = {name: '', status: ''};
  @Input() id: number = -1;

  constructor(private accountsService: AccountsService){}

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);
    this.accountsService.statusUpdated.emit(status);
  }
}
