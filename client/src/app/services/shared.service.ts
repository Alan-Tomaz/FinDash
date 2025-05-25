import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Observable for sidebar chosen option
  private sidebarSelectedOption = new BehaviorSubject<string>(''); // Default value for sidebar option

  sidebarSelectedOption$ = this.sidebarSelectedOption.asObservable();

  setSelectedOption(option: string) {
    this.sidebarSelectedOption.next(option);
  }
  constructor() {}
}
