import { Component } from '@angular/core';
import { ItemsListComponent } from '../../reusableComponents/items-list/items-list.component';

@Component({
  selector: 'app-users',
  imports: [ItemsListComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {}
