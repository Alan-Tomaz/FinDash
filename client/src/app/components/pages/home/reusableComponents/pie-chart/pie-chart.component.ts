import { Component, inject, Input, OnInit } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedService } from '../../../../../services/shared.service';

@Component({
  selector: 'app-pie-chart',
  imports: [NgxChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit {
  private sharedService = inject(SharedService);

  theme: string = '';

  // Pie Chart Data
  @Input() pieData: Array<object> = [];

  ngOnInit() {
    // Subscribe to the shared service to get the selected sidebar option
    this.sharedService.theme$.subscribe((option) => {
      this.theme = option;
    });
  }

  // view dimensions
  view: [number, number] = [450, 420];

  // Colors
  colorScheme: string = 'cool';

  // Layout Options
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  tooltipDisabled: boolean = false;
}
