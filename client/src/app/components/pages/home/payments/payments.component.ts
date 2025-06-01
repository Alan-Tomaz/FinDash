import { Component } from '@angular/core';
import { ItemsListComponent } from '../reusableComponents/items-list/items-list.component';

@Component({
  selector: 'app-payments',
  imports: [ItemsListComponent],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent {}
