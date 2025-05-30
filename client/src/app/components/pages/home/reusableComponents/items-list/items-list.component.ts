import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-items-list',
  imports: [CommonModule],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss',
})
export class ItemsListComponent {
  @ViewChild('exportDropdown') exportDropdown!: ElementRef;

  isExportDropdownOpen: boolean = false;
  isExportDropdownHovering: boolean = false;

  handleShowExportDropdown(): void {
    this.isExportDropdownOpen = !this.isExportDropdownOpen;
  }

  // Close the dropdowns when clicking outside of them
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Close the time filter dropdown if it is open and the click is outside of it
    if (
      this.isExportDropdownOpen &&
      this.exportDropdown &&
      !this.exportDropdown.nativeElement.contains(target) &&
      !target.closest('.hover\\:cursor-pointer')
    ) {
      this.isExportDropdownOpen = false;
    }
  }
}
