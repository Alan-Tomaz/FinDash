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
  selectedIndex: number | null = null;
  hoveredColumn: string | null = null;
  filteredItem: string = '';
  filterOrder: string = '';

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

  selectItem(index: number): void {
    if (index != this.selectedIndex) {
      this.selectedIndex = index;
    } else {
      this.selectedIndex = null;
    }
  }

  changeFilterItem(item: string): void {
    if (item != this.filteredItem) {
      this.filteredItem = item;
      this.filterOrder = 'Descending';
    } else {
      if (this.filterOrder == 'Descending') {
        this.filterOrder = 'Ascending';
      } else {
        this.filterOrder = 'Descending';
      }
    }
  }

  deleteItems(): void {}

  editItems(): void {}
}
