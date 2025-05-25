import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private sharedService = inject(SharedService);

  sidebarOpenStatus: boolean = true;
  sidebarOption: string = 'Dashboard';
  subSidebarOption: string = '';
  isSidebarOpening: boolean = false;
  isAdminSidebarOpen: boolean = false;

  // Method to set the sidebar option and update the sub-option
  changeSidebarOption(option: string, suboption: string = ''): void {
    switch (option) {
      case 'Dashboard':
        this.sidebarOption = 'Dashboard';
        this.subSidebarOption = '';
        this.sharedService.setSelectedOption(option);
        break;
      case 'Earnings':
        this.sidebarOption = 'Earnings';
        this.subSidebarOption = suboption;
        this.sharedService.setSelectedOption(option);
        break;
      case 'Payments':
        this.sidebarOption = 'Payments';
        this.subSidebarOption = suboption;
        this.sharedService.setSelectedOption(option);
        break;
      case 'Categories':
        this.sidebarOption = 'Categories';
        this.subSidebarOption = suboption;
        this.sharedService.setSelectedOption(option);
        break;
      case 'Admin':
        this.sidebarOption = 'Admin';
        this.subSidebarOption = suboption;
        this.sharedService.setSelectedOption(suboption);
        break;
      default:
        this.sidebarOption = 'Dashboard';
        this.subSidebarOption = '';
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
        this.showMoreOptions(false);
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
  showMoreOptions(needToShow: boolean = true): void {
    const moreOptions = document.querySelectorAll('[data-moreoptions]');
    const moreOption1 = document.getElementById('more-option1');
    const moreOption2 = document.getElementById('more-option2');

    if (needToShow) {
      moreOption1?.classList.add('animate-slide');
      moreOption1?.classList.add('duration-300');
      setTimeout(() => {
        moreOption1?.classList.add('animate-slide');
        moreOption1?.classList.add('translate-y-0');
        moreOption1?.classList.add('opacity-100');

        moreOption2?.classList.add('animate-slide');
        moreOption2?.classList.add('duration-300');
      }, 300);
      setTimeout(() => {
        moreOption2?.classList.add('animate-slide');
        moreOption2?.classList.add('translate-y-0');
        moreOption2?.classList.add('opacity-100');
      }, 600);
    } else {
      this.isAdminSidebarOpen = false;
    }
  }
}
