import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Color,
  LegendPosition,
  NgxChartsModule,
  ScaleType,
} from '@swimlane/ngx-charts';
import { SharedService } from '../../../../../services/shared.service';

@Component({
  selector: 'app-line-chart',
  imports: [NgxChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit {
  private sharedService = inject(SharedService);

  // Time filter dropdown
  @ViewChild('timeFilter') timeFilterDropdown!: ElementRef;

  theme: string = '';
  isTimeFilterOpen: boolean = false;
  timePeriod: string = 'Last Month'; // Default time period
  isTimePeriodHovering: boolean = false;

  // Line Chart Data
  @Input() lineData: Array<object> = [];

  ngOnInit() {
    // Subscribe to the shared service to get the selected sidebar option
    this.sharedService.theme$.subscribe((option) => {
      this.theme = option;
    });
  }

  // Close the dropdowns when clicking outside of them
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Close the time filter dropdown if it is open and the click is outside of it
    if (
      this.isTimeFilterOpen &&
      this.timeFilterDropdown &&
      !this.timeFilterDropdown.nativeElement.contains(target) &&
      !target.closest('.hover\\:cursor-pointer')
    ) {
      this.isTimeFilterOpen = false;
    }
  }

  handleTimeFilterToggle() {
    this.isTimeFilterOpen = !this.isTimeFilterOpen;
  }

  // view dimensions
  view: [number, number] = [950, 420];

  // Colors
  /* colorScheme: string = 'cool'; */
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#28a745', '#dc3545'], // Green and Red
  };

  // Layout Options
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Right;
  tooltipDisabled: boolean = false;
}
