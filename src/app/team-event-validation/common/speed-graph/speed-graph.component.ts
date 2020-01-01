import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
// import * as moment from 'moment';
import * as moment from 'moment-timezone'
// import * as HighchartsBoost  from 'highcharts/modules/boost';
let Boost = require('highcharts/modules/boost');
Boost(Highcharts);


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
      type: 'line',
      zoomType: 'x',
      panning: true,
      panKey: 'shift',
      style: {
        fontFamily: 'Montserrat'
      },
      height: 210,
      backgroundColor: '#ffffff',
      color: '#f9b62b'
    },
    boost: {
      useGPUTranslations: true
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
        data: []
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


  n = 100000;
  data;
  constructor() { }

  ngOnInit() {
    this.data = this.getData(this.n);
    this.chartOptions.series[0].data = this.data;
  }

  getData(n) {
    var arr = [],
        i,
        a,
        b,
        c,
        spike;
    for (i = 0; i < n; i = i + 1) {
        if (i % 100 === 0) {
            a = 2 * Math.random();
        }
        if (i % 1000 === 0) {
            b = 2 * Math.random();
        }
        if (i % 10000 === 0) {
            c = 2 * Math.random();
        }
        if (i % 50000 === 0) {
            spike = 10;
        } else {
            spike = 0;
        }
        arr.push([
            i,
            2 * Math.sin(i / 100) + a + b + c + spike + Math.random()
        ]);
    }
    return arr;
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
