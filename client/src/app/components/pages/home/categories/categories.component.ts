import { Component } from '@angular/core';
import { ItemsListComponent } from '../reusableComponents/items-list/items-list.component';

@Component({
  selector: 'app-categories',
  imports: [ItemsListComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {}
