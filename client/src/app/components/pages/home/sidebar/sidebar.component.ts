import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  sidebarOpenStatus: boolean = true;

  toggleSidebar() {
    this.sidebarOpenStatus = !this.sidebarOpenStatus;
  }
}
