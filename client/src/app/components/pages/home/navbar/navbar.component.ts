import { Component, inject, OnInit } from '@angular/core';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private sharedService = inject(SharedService);

  navbarOption: string = 'Dashboard';

  ngOnInit() {
    this.sharedService.sidebarSelectedOption$.subscribe((option) => {
      this.navbarOption = option;
    });
  }
}
