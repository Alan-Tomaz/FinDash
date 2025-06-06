import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Observable for sidebar chosen option

  private sidebarSelectedOption = new BehaviorSubject<string>(''); // Default value for sidebar option
  private theme = new BehaviorSubject<string>(
    localStorage.getItem('theme') || 'light'
  ); // Default theme
  private isAlertPopupOpen = new BehaviorSubject<boolean>(false); // Default value for alert popup visibility
  private isNewItemPopupOpen = new BehaviorSubject<boolean>(false); // Default value for new item popup visibility
  private isEditProfilePopupOpen = new BehaviorSubject<boolean>(false); // Default value for edit profile popup visibility
  private isSidebarOpen = new BehaviorSubject<boolean>(
    this.getInitialSidebarState()
  );

  isSidebarOpen$ = this.isSidebarOpen.asObservable();
  sidebarSelectedOption$ = this.sidebarSelectedOption.asObservable();
  theme$ = this.theme;
  showAlertPopup$ = this.isAlertPopupOpen.asObservable();
  showNewItemPopup$ = this.isNewItemPopupOpen.asObservable();
  showEditProfilePopup$ = this.isEditProfilePopupOpen.asObservable();

  private getInitialSidebarState(): boolean {
    return window.innerWidth >= 640;
  }

  handleSidebarOpen(option: boolean): void {
    this.isSidebarOpen.next(option);
  }

  setSelectedOption(option: string): void {
    this.sidebarSelectedOption.next(option);
  }

  showAlertPopUp(option: boolean): void {
    this.isAlertPopupOpen.next(option);
  }

  showEditProfilePopUp(option: boolean): void {
    this.isEditProfilePopupOpen.next(option);
  }

  showNewItemPopUp(option: boolean): void {
    this.isNewItemPopupOpen.next(option);
  }

  setTheme(theme: string): void {
    this.theme.next(theme);
  }
  constructor() {}
}
