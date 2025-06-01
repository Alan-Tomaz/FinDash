import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AlertPopupComponent } from '../alert-popup/alert-popup.component';
import { NewItemComponent } from '../new-item/new-item.component';
import { SharedService } from '../../../../../services/shared.service';

@Component({
  selector: 'app-items-list',
  imports: [CommonModule, AlertPopupComponent, NewItemComponent],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss',
})
export class ItemsListComponent implements OnInit {
  private sharedService = inject(SharedService);

  @Input() minHeight: string = 'normal';

  ngOnInit() {
    // Subscribe to the shared service to get the selected show alert popup state
    this.sharedService.showAlertPopup$.subscribe((option) => {
      this.showAlert = option;
    });

    // Subscribe to the shared service to get the selected show new item popup state
    this.sharedService.showNewItemPopup$.subscribe((option) => {
      this.showNewItemPopup = option;
    });
  }

  @ViewChild('exportDropdown') exportDropdown!: ElementRef;

  isExportDropdownOpen: boolean = false;
  isExportDropdownHovering: boolean = false;
  selectedIndex: number | null = null;
  hoveredColumn: string | null = null;
  filteredItem: string = '';
  filterOrder: string = '';
  items: [] = [];
  totalItems: number = this.items.length;
  searchValue: string = '';
  showAlert: boolean = false;
  showNewItemPopup: boolean = false;

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

  /* Select Items of list */
  selectItem(index: number): void {
    if (index != this.selectedIndex) {
      this.selectedIndex = index;
    } else {
      this.selectedIndex = null;
    }
  }

  /* Change filter order of itens */
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

  /* Search items */
  handleSearchItem(): void {}

  deleteItems(): void {}

  editItems(): void {}

  /* Export itens to XSLX, PDF and PNG */
  exportItems(type: string): void {}

  handleShowAlert(): void {
    // share showpopup show state and change it to true
    this.sharedService.showAlertPopUp(true);
  }

  /* Add or Edit a Item */
  handleNewItem(type: string): void {
    // share show popup show state and change it to true
    this.sharedService.showNewItemPopUp(true);
  }
}
