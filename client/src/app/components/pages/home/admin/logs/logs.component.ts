import { Component } from '@angular/core';
import { ItemsListComponent } from '../../reusableComponents/items-list/items-list.component';

@Component({
  selector: 'app-logs',
  imports: [ItemsListComponent],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss',
})
export class LogsComponent {}
