import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { SharedService } from '../../../../../services/shared.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class EditProfileComponent {
  private sharedService = inject(SharedService);

  @Input() isShow: boolean = false;

  profileSection: 'view-profile' | 'edit-password' = 'view-profile';
  visibleSection: 'view-profile' | 'edit-password' | null = 'view-profile';

  isEditing: boolean = false;
  isEditingVisible: boolean | null = false;
  isAvatarHovering: boolean = false;

  name: string = 'Test';
  phoneNumber: string = '12345678';
  email: string = '12345678';
  password: string = '********';
  confirmPassword: string = '********';
  avatar: string = '12345678';

  changeSection(section: 'view-profile' | 'edit-password') {
    if (this.profileSection !== section) {
      this.profileSection = section;
      this.visibleSection = null;
      this.isEditing = false;
      this.isEditingVisible = false;
    }
  }

  handleEditMode(isEditing: boolean) {
    this.isEditing = isEditing;
    this.isEditingVisible = null;
    if (isEditing == false) {
      this.password = '********';
      this.confirmPassword = '********';
    }
  }

  onFadeDoneEditAnimation(event: any) {
    if (event.toState === 'void') {
      this.isEditingVisible = this.isEditing;
    }
  }

  onFadeDone(event: any) {
    if (event.toState === 'void') {
      this.visibleSection = this.profileSection;
    }
  }

  handleClosePopup() {
    this.sharedService.showEditProfilePopUp(false);
  }

  handleEditData(type: 'avatar' | 'profileInfo' | 'password') {
    this.handleEditMode(false);
  }
}
