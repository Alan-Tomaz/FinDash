import { Component } from '@angular/core';
import { ItemsListComponent } from '../reusableComponents/items-list/items-list.component';

@Component({
  selector: 'app-earnings',
  imports: [ItemsListComponent],
  templateUrl: './earnings.component.html',
  styleUrl: './earnings.component.scss',
})
export class EarningsComponent {}
