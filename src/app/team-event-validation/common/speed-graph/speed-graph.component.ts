import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
// import * as moment from 'moment';
import * as moment from 'moment-timezone'

@Component({
  selector: 'app-speed-graph',
  templateUrl: './speed-graph.component.html',
  styleUrls: ['./speed-graph.component.scss']
})
export class SpeedGraphComponent implements OnInit, OnChanges {
  @Input() timeDuration: any; 
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  updateFlag = true; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  runOutsideAngular = false; // optional boolean, defaults to false
  chartOptions: any = {
    chart: {
      type: 'area',
      style: {
        fontFamily: 'Montserrat'
      },
      height: 210,
      backgroundColor: '#ffffff',
      color: '#f9b62b'
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    xAxis: {
      // type: 'datetime',
      plotLines: [
        {
          color: '#cccccc',
          value: 13,
          width: 3,
          zIndex: 3,
          dashStyle: 'ShortDot',
          label: { 
            text: 'start',
          }
        },
        {
          color: '#cccccc',
          value: 14.1,
          width: 3,
          zIndex: 3,
          dashStyle: 'ShortDot',
          label: { 
            text: 'end',
          }
        },
        {
          color: '#11cd69',
          value: 13.3,
          width: 3,
          zIndex: 3
        },
        {
          color: '#11cd69',
          value: 13.7,
          width: 3,
          zIndex: 3
        }
      ],
      plotBands: [
        {
          color: '#e7e7e7',
          from: 13.05,
          to: 13.25,
          label: { 
            text: 'phase 1',
          }
        },
        {
          color: '#e7e7e7',
          from: 13.35,
          to: 13.55
        },
        {
          color: '#e7e7e7',
          from: 13.75,
          to: 13.95
        }
    ],
    },
    yAxis: {
      title: false
    },
    plotOptions: {
      series: {
        fillOpacity: 0.1
      }
    },
    series: [
      {
        type: 'area',
        color: '#621e6a',
        showInLegend: false,
        name: 'Line 1',
        data: [
          [13, 2.4],
          [13.1, 2.6],
          [13.2, 3.4],
          [13.3, 4.4],
          [13.4, 2.4],
          [13.5, 5.4],
          [13.6, 7.4],
          [13.7, 4.4],
          [13.8, 5.4],
          [13.9, 6.4],
          [14, 7.4],
          [14.1, 4.4]
        ]
      }
    ],
    // time: {
    //     /**
    //      * Use moment-timezone.js to return the timezone offset for individual
    //      * timestamps, used in the X axis labels and the tooltip header.
    //      */
    //     getTimezoneOffset: (timestamp) => {
    //         const zone = 'Europe/Oslo';
    //         const timezoneOffset = moment.tz(timestamp, zone).utcOffset();
    //         return timezoneOffset;
    //     }
    // }
  };

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const dateFromDurationComponent = changes.timeDuration.currentValue;
    console.log('dateFromDurationComponent: ', dateFromDurationComponent);

    if(dateFromDurationComponent) {
      // console.log('not first');
      const startedAtUtcToDate = moment(dateFromDurationComponent.startedAt).format('HH:mm');
      const endedAtUtcToDate = moment(dateFromDurationComponent.endedAt).format('HH:mm');

      console.log('start: ', startedAtUtcToDate);
      console.log('end: ', endedAtUtcToDate);

      this.updateData(startedAtUtcToDate, endedAtUtcToDate);
    }
  }
  
  updateData(startTime, endTime) {
    this.chartOptions.xAxis.plotLines =  [
      {
        color: '#f9b62b',
        value: 13.6,
        width: 2
      },
      {
        color: '#f9b62b',
        value: 14,
        width: 2
      }
    ];
    this.updateFlag = true;
  }
}
