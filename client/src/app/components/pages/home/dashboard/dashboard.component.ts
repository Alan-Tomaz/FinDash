import { Component } from '@angular/core';
import { SummaryCardComponent } from '../reusableComponents/summary-card/summary-card.component';
import { PieChartComponent } from '../reusableComponents/pie-chart/pie-chart.component';
import { LineChartComponent } from '../reusableComponents/line-chart/line-chart.component';
import { ItemsListComponent } from '../reusableComponents/items-list/items-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    SummaryCardComponent,
    PieChartComponent,
    LineChartComponent,
    ItemsListComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  pieData = [
    { name: 'Produto A', value: 30 },
    { name: 'Produto B', value: 50 },
    { name: 'Produto C', value: 20 },
  ];

  lineData = [
    {
      name: 'Série A',
      series: [
        { name: 'Jan', value: 30 },
        { name: 'Fev', value: 45 },
        { name: 'Mar', value: 28 },
        { name: 'Abr', value: 60 },
      ],
    },
    {
      name: 'Série B',
      series: [
        { name: 'Jan', value: 15 },
        { name: 'Fev', value: 25 },
        { name: 'Mar', value: 35 },
        { name: 'Abr', value: 40 },
      ],
    },
  ];
}
