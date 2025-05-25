import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Observable for sidebar chosen option

  private sidebarSelectedOption = new BehaviorSubject<string>('Dashboard'); // Default value for sidebar option
  private theme = new BehaviorSubject<string>(
    localStorage.getItem('theme') || 'light'
  ); // Default theme

  sidebarSelectedOption$ = this.sidebarSelectedOption.asObservable();
  theme$ = this.theme.asObservable(); // Default theme

  setSelectedOption(option: string) {
    this.sidebarSelectedOption.next(option);
  }

  setTheme(theme: string) {
    this.theme.next(theme);
  }
  constructor() {}
}
