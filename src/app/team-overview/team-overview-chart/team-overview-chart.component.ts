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
      type: 'line'
    },
    title: {
      text: 'Linechart'
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
          // {
          //   point: {
          //       x: 0,
          //       y: 0
          //   }
          // },
          // {
          //   point: {
          //       x: 5,
          //       y: 100,
          //       xAxis: 0
          //   }
          // }
        ]
      }
    ],
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3],
        color: '#a50740',
        type: undefined
      }
    ]
  });

  constructor() {}

  ngOnInit() {}

  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }
}
