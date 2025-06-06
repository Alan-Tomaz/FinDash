import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private sharedService = inject(SharedService);

  isSidebarOpen: boolean | null = null;

  ngOnInit(): void {
    this.sharedService.isSidebarOpen$.subscribe((option) => {
      this.isSidebarOpen = option;
    });
  }
}
