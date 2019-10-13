import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-team-overview-chart',
  templateUrl: './team-overview-chart.component.html',
  styleUrls: ['./team-overview-chart.component.scss']
})
export class TeamOverviewChartComponent implements OnInit {
  chart = new Chart({
    chart: {
      type: 'line',
      style: {
        fontFamily: 'Work Sans'
      }
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    annotations: [
      {
        labels: [
          {
            point: {
              x: 1,
              y: 2,
              xAxis: 0,
              yAxis: 0
            }
          }
        ]
      }
    ],
    plotOptions: {
      series: {
        color: '#d31c4c'
      }
    },
    yAxis: {
      title: false
   },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    series: [
      {
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      }
    ]
  } as any);

  constructor() {}

  ngOnInit() {}
}
