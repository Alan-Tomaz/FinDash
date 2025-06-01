import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { SharedService } from '../../../../../services/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.scss',
})
export class NewItemComponent {
  private sharedService = inject(SharedService);

  @ViewChild('typeDropdown') typeDropdown!: ElementRef;
  @ViewChild('categoryDropdown') categoryDropdown!: ElementRef;

  @Input() isShow: boolean = false;
  isCategoryDropdownOpen: boolean = false;
  isCategoryHovering: boolean = false;
  isTypeDropdownOpen: boolean = false;
  typeDropdownValue: string = 'EARNING';
  isTypeDropdownHovering: boolean = false;
  isRecurrent: boolean = false;

  /* INPUT VALUES */
  name: string = '';
  value: string = '';
  category: string = 'Category';
  description: string = '';
  date: string = '';

  // Close the dropdowns when clicking outside of them
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Close the type dropdown if it is open and the click is outside of it
    if (
      this.isTypeDropdownOpen &&
      this.typeDropdown &&
      !this.typeDropdown.nativeElement.contains(target)
    ) {
      this.isTypeDropdownOpen = false;
    }

    // Close the category dropdown if it is open and the click is outside of it
    if (
      this.isCategoryDropdownOpen &&
      this.categoryDropdown &&
      !this.categoryDropdown.nativeElement.contains(target)
    ) {
      this.isCategoryDropdownOpen = false;
    }
  }

  handleClosePopup(): void {
    this.sharedService.showNewItemPopUp(false);
  }

  handleOpenTypeDropdown(): void {
    this.isTypeDropdownOpen = !this.isTypeDropdownOpen;
  }

  handleOpenCategoryDropdown(): void {
    this.isCategoryDropdownOpen = !this.isCategoryDropdownOpen;
  }

  handleSelectTypeDropdown(type: string): void {
    this.typeDropdownValue = type;
    this.isTypeDropdownOpen = false;
  }

  /* OPEN THE DATE INPUT AFTER DOUBLE CLICK HIM */
  openDatePicker(event: MouseEvent) {
    const input = event.target as HTMLInputElement;
    input.focus();
    input.showPicker?.();
  }
}
