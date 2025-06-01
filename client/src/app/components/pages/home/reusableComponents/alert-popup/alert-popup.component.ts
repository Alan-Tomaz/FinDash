import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { SharedService } from '../../../../../services/shared.service';

@Component({
  selector: 'app-alert-popup',
  imports: [CommonModule],
  templateUrl: './alert-popup.component.html',
  styleUrl: './alert-popup.component.scss',
})
export class AlertPopupComponent {
  private sharedService = inject(SharedService);

  @Input() isShow: boolean = false;

  handleClosePopup(): void {
    this.sharedService.showAlertPopUp(false);
  }
}
