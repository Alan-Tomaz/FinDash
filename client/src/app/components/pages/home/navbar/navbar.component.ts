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
import { EditProfileComponent } from '../reusableComponents/edit-profile/edit-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, EditProfileComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private sharedService = inject(SharedService);
  private router = inject(Router);

  theme: string = 'light'; // Default theme
  navbarOption: string = '';
  isEditProfileHovering: boolean = false;
  isNotificationDropdownHovering: boolean = false;
  isShowProfileDropdownOpen: boolean = false;
  isShowNotificationDropdownOpen: boolean = false;
  isEditProfilePopupOpen: boolean = false;

  // ViewChild to access the dropdown elements
  @ViewChild('profileDropdown') profileDropdown!: ElementRef;
  @ViewChild('notificationDropdown') notificationDropdown!: ElementRef;

  // Show the selected option in the sidebar
  ngOnInit() {
    // Subscribe to the shared service to get the selected sidebar option
    this.sharedService.sidebarSelectedOption$.subscribe((option) => {
      if (option == '') {
        const currentUrl = this.router.url;
        const paths = currentUrl.split('/');
        const currentPath = paths[paths.length - 1];
        switch (currentPath) {
          case 'home':
            this.navbarOption = 'Dashboard';
            break;
          case 'earnings':
            this.navbarOption = 'Earnings';
            break;
          case 'payments':
            this.navbarOption = 'Payments';
            break;
          case 'categories':
            this.navbarOption = 'Categories';
            break;
          case 'users':
            this.navbarOption = 'Users';
            break;
          case 'logs':
            this.navbarOption = 'Logs';
            break;
          default:
            this.navbarOption = 'Dashboard';
            break;
        }
      } else {
        this.navbarOption = option;
      }
    });

    // Subscribe to the shared service to get the selected show alert popup state
    this.sharedService.showEditProfilePopup$.subscribe((option) => {
      this.isEditProfilePopupOpen = option;
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

  handleOpenEditProfile(): void {
    this.isShowProfileDropdownOpen = false;
    this.sharedService.showEditProfilePopUp(true); // Update the edit profile visibility in the shared service
  }
}
