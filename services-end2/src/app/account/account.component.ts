import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountsService } from '../services/accounts.service';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [
    LoggingService,
    AccountsService,
  ],
})
export class AccountComponent {
  @Input() account: {name: string, status: string} = {name: '', status: ''};
  @Input() id: number = -1;

  constructor(private loggingService: LoggingService, private accountsService: AccountsService){}

  onSetTo(status: string) {
    this.loggingService.logStatusChange(status);
    this.accountsService.updateStatus(this.id, status);
  }
}
