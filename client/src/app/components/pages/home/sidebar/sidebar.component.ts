import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../../services/shared.service';
import { RouterModule, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  private router = inject(Router);
  private sharedService = inject(SharedService);
  private breakpointObserver = inject(BreakpointObserver);

  sidebarOpenStatus: boolean | null = true;
  sidebarOption: string = '';
  subSidebarOption: string = '';
  isSidebarOpening: boolean = false;
  isAdminSidebarOpen: boolean = false;
  sidebarHasTransition: boolean = false;
  sidebarTextVisible: boolean = false;
  isSmallDevice: boolean = false;
  sidebarReady: boolean = false;

  ngOnInit(): void {
    /* Close the sidebar in small screens */
    if (this.breakpointObserver.isMatched([Breakpoints.Handset])) {
      this.isSmallDevice = true;
      this.sidebarHasTransition = false;
      this.sidebarOpenStatus = false;
      this.sharedService.handleSidebarOpen(false);
      /*   setTimeout(() => {
        const sidebarTexts = document.querySelectorAll('[data-sidebartext]');
        sidebarTexts.forEach((text) => {
          text.classList.add('opacity-0');
          text.classList.add('hidden');
        });
      }); */
      this.isSidebarOpening = false;
      this.showMoreOptions(false, true);
    } else {
      this.isSmallDevice = false;
      this.sidebarOpenStatus = true;
      this.sharedService.handleSidebarOpen(true);
      this.sidebarHasTransition = true;
    }
    this.sidebarReady = true;

    // Change the sidebar string accordingly the URL
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
        setTimeout(() => {
          this.showMoreOptions();
        }, 0);
        break;
      case 'logs':
        this.sidebarOption = 'Admin';
        this.subSidebarOption = 'Logs';
        this.isAdminSidebarOpen = true;
        setTimeout(() => {
          this.showMoreOptions();
        }, 0);
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
  toggleSidebar(sidebarParam: boolean | null = false): void {
    if (this.isSidebarOpening == false) {
      this.sidebarTextVisible = true;
      this.sidebarHasTransition = true;
      this.isSidebarOpening = true;

      if (sidebarParam) {
        this.sidebarOpenStatus = true;
        this.sharedService.handleSidebarOpen(true);
      } else {
        this.sidebarOpenStatus = !this.sidebarOpenStatus;
        this.sharedService.handleSidebarOpen(this.sidebarOpenStatus);
      }

      if (this.sidebarOpenStatus == false || sidebarParam == null) {
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
        }, 400);
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
