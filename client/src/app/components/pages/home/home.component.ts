import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  imports: [SidebarComponent, NavbarComponent, DashboardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
