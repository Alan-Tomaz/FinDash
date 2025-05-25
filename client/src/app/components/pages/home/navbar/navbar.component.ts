import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SharedService } from '../../../../services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private sharedService = inject(SharedService);

  theme: string = 'light'; // Default theme
  navbarOption: string = 'Dashboard';
  isEditProfileHovering: boolean = false;
  isNotificationDropdownHovering: boolean = false;
  isShowProfileDropdownOpen: boolean = false;
  isShowNotificationDropdownOpen: boolean = false;

  // ViewChild to access the dropdown elements
  @ViewChild('profileDropdown') profileDropdown!: ElementRef;
  @ViewChild('notificationDropdown') notificationDropdown!: ElementRef;

  // Show the selected option in the sidebar
  ngOnInit() {
    // Subscribe to the shared service to get the selected sidebar option
    this.sharedService.sidebarSelectedOption$.subscribe((option) => {
      this.navbarOption = option;
    });

    // Get the theme in local storage and set it (if exists)
    const saved = localStorage.getItem('theme');
    if (saved) {
      this.handleThemeChange(saved as 'light' | 'dark');
    }
  }

  handleThemeChange(theme: string): void {
    this.theme = theme; // Update the theme variable
    this.sharedService.setTheme(theme); // Update the theme in the shared service
    localStorage.setItem('theme', theme); // Save the theme in local storage
    // Change the theme of the site
    const html = document.documentElement;
    if (theme == 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  // Close the dropdowns when clicking outside of them
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Close the time filter dropdown if it is open and the click is outside of it
    if (
      this.isShowProfileDropdownOpen &&
      this.profileDropdown &&
      !this.profileDropdown.nativeElement.contains(target) &&
      !target.closest('.hover\\:cursor-pointer')
    ) {
      this.isShowProfileDropdownOpen = false;
    }

    if (
      this.isShowNotificationDropdownOpen &&
      this.notificationDropdown &&
      !this.notificationDropdown.nativeElement.contains(target) &&
      !target.closest('.hover\\:cursor-pointer')
    ) {
      this.isShowNotificationDropdownOpen = false;
    }
  }

  // Manipulate the navbar dropdowns

  handleShowProfileDropdown(): void {
    this.isShowProfileDropdownOpen = !this.isShowProfileDropdownOpen; // Toggle profile dropdown
    this.isShowNotificationDropdownOpen = false; // Close notification dropdown if profile is opened
  }

  handleShowNotificationsDropdown(): void {
    this.isShowNotificationDropdownOpen = !this.isShowNotificationDropdownOpen; // Toggle notification dropdown
    this.isShowProfileDropdownOpen = false; // Close profile dropdown if notifications are opened
  }
}
