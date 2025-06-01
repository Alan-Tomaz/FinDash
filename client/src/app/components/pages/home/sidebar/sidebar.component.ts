import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../../services/shared.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  private router = inject(Router);
  private sharedService = inject(SharedService);

  sidebarOpenStatus: boolean = true;
  sidebarOption: string = '';
  subSidebarOption: string = '';
  isSidebarOpening: boolean = false;
  isAdminSidebarOpen: boolean = false;

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const paths = currentUrl.split('/');
    const currentPath = paths[paths.length - 1];
    switch (currentPath) {
      case 'home':
        this.sidebarOption = 'Dashboard';
        break;
      case 'earnings':
        this.sidebarOption = 'Earnings';
        break;
      case 'payments':
        this.sidebarOption = 'Payments';
        break;
      case 'categories':
        this.sidebarOption = 'Categories';
        break;
      case 'users':
        this.sidebarOption = 'Admin';
        this.subSidebarOption = 'Users';
        this.isAdminSidebarOpen = true;
        this.showMoreOptions();
        break;
      case 'logs':
        this.sidebarOption = 'Admin';
        this.subSidebarOption = 'Logs';
        this.isAdminSidebarOpen = true;
        this.showMoreOptions();
        break;
      default:
        this.sidebarOption = 'Dashboard';
        break;
    }
  }

  // Method to set the sidebar option and update the sub-option
  changeSidebarOption(option: string, subOption: string = ''): void {
    this.sidebarOption = option;
    this.subSidebarOption = subOption;
    if (option == 'Admin') {
      this.sharedService.setSelectedOption(subOption);
      if (subOption == 'Logs') {
        this.router.navigate(['/home/admin/logs']);
      }
      if (subOption == 'Users') {
        this.router.navigate(['/home/admin/users']);
      }
    } else {
      this.sharedService.setSelectedOption(option);
    }
  }

  // Method to manipulate sidear animation and visibility
  toggleSidebar(sidebarParam: boolean = false): void {
    if (this.isSidebarOpening == false) {
      this.isSidebarOpening = true;

      if (sidebarParam) {
        this.sidebarOpenStatus = true;
      } else {
        this.sidebarOpenStatus = !this.sidebarOpenStatus;
      }

      if (this.sidebarOpenStatus == false) {
        const sidebarTexts = document.querySelectorAll('[data-sidebartext]');
        sidebarTexts.forEach((text) => {
          text.classList.add('opacity-0');
        });
        setTimeout(() => {
          sidebarTexts.forEach((text) => {
            text.classList.add('hidden');
          });
        }, 250);
        setTimeout(() => {
          this.isSidebarOpening = false;
        }, 1000);
        this.showMoreOptions(false, true);
      } else {
        const sidebarTexts = document.querySelectorAll('[data-sidebartext]');
        setTimeout(() => {
          sidebarTexts.forEach((text) => {
            text.classList.remove('hidden');
          });
        }, 300);
        setTimeout(() => {
          sidebarTexts.forEach((text) => {
            text.classList.remove('opacity-0');
          });
        }, 500);
        setTimeout(() => {
          this.isSidebarOpening = false;
        }, 1000);
      }
    }
  }

  // Method to show more options for the admin in sidebar
  showMoreOptions(
    needToShow: boolean = true,
    closeSidebar: boolean = false
  ): void {
    const moreOptions = document.querySelectorAll('[data-moreoptions]');
    const moreOption1 = document.getElementById('more-option1');
    const moreOption2 = document.getElementById('more-option2');

    if (needToShow) {
      moreOption1?.classList.add('animate-slide');
      moreOption1?.classList.add('duration-300');
      setTimeout(() => {
        moreOption1?.classList.add('translate-y-0');
        moreOption1?.classList.add('opacity-100');

        moreOption2?.classList.add('animate-slide');
        moreOption2?.classList.add('duration-300');
      }, 300);
      setTimeout(() => {
        moreOption2?.classList.add('translate-y-0');
        moreOption2?.classList.add('opacity-100');
      }, 600);
    } else {
      this.isAdminSidebarOpen = false;
      if (!closeSidebar) {
        moreOption1?.classList.remove('animate-slide');
        moreOption1?.classList.remove('duration-300');
        moreOption1?.classList.remove('translate-y-0');
        moreOption1?.classList.remove('opacity-100');
        moreOption2?.classList.remove('duration-300');
        moreOption2?.classList.remove('animate-slide');
        moreOption2?.classList.remove('translate-y-0');
        moreOption2?.classList.remove('opacity-100');
        setTimeout(() => {
          moreOption1?.classList.add('opacity-0');
          moreOption2?.classList.add('opacity-0');
        }, 500);
      }
    }
  }
}
