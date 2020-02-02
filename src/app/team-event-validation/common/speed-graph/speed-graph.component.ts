import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
// import * as moment from 'moment';
import * as moment from 'moment-timezone'
// import * as HighchartsBoost  from 'highcharts/modules/boost';
// let Boost = require('highcharts/modules/boost');
// Boost(Highcharts);

const CHART_OPTIONS = {
	OPACITY: 0.8,
	PLOT_BAND_COLOR: '#e7e7e7'
}

const plotLines = [
	{
		color: '#11cd69',
		value: 0,
		width: 3,
		zIndex: 5
	},
	{
		color: '#11cd69',
		value: 0,
		width: 3,
		zIndex: 5
	}
];

@Component({
	selector: 'app-speed-graph',
	templateUrl: './speed-graph.component.html',
	styleUrls: ['./speed-graph.component.scss']
})
export class SpeedGraphComponent implements OnInit, OnChanges {
	@Input() vertices: Array<any> = [];
	@Input() highlightedRange: { startTime: number, endTime: number };
	@Input() timeDuration: number;
	@Input() startTime: number;
	@Input() plotBands: Array<any> = [];

	Highcharts: typeof Highcharts = Highcharts; // required
	chartConstructor = 'chart'; // optional string, defaults to 'chart'
	updateFlag = true; // optional boolean
	oneToOneFlag = true; // optional boolean, defaults to false
	runOutsideAngular = false; // optional boolean, defaults to false
	chart;
	chartOptions: any = {
		chart: {
			type: 'areaspline',
			style: {
				fontFamily: 'Montserrat'
			},
			height: 130,
			backgroundColor: '#ffffff',
			color: '#f9b62b',
			zoomType: 'x'
		},
		title: {
			text: ''
		},
		credits: {
			enabled: false
		},
		xAxis: {
			type: 'datetime',
			labels: {
				overflow: 'justify'
			}
		},
		yAxis: {
			minorGridLineWidth: 0,
			gridLineWidth: 0,
			title: {
				text: 'M/S'
			},
		},
		tooltip: {
			enabled: false
		},
		plotOptions: {
			areaspline: {
				pointStart: 1550044800000,
				fillOpacity: CHART_OPTIONS.OPACITY,
				pointInterval: 1800000
			},
			series: {
				fillOpacity: CHART_OPTIONS.OPACITY,
				marker: false
			}
		},
		series: [
			{
				type: 'areaspline',
				color: '#621e6a',
				showInLegend: false,
				name: 'Line 1',
				data: []
			}
		],
		time: {
			useUTC: false
		}
	};

	constructor() { }

	ngOnInit() {
		this.chartOptions = this.getUpdatedOptions({ ...this });
	}

	ngOnChanges(changes: SimpleChanges) {
		this.chartOptions = this.getUpdatedOptions({ ...this, ...Object.values(changes).map(c => c.currentValue) });
		if (this.chart) {
			this.chart.reflow();
		}
	}

	chartCallback(chart) {
		this.chart = chart;
	}

	getUpdatedOptions(newOptions) {
		return {
			...this.chartOptions,
			series: [
				{...this.chartOptions.series[0], data: newOptions.vertices}
			],
			plotOptions: {
				...this.chartOptions.plotOptions,
				areaspline: {
					...this.chartOptions.plotOptions.areaspline,
					pointStart: newOptions.startTime,
					pointInterval: newOptions.timeDuration
				}
			},
			xAxis: {
				...this.chartOptions.xAxis,
				plotLines: plotLines.map((plotLine, i) => (
					{ ...plotLine, value: i === 0 ? newOptions.highlightedRange.startTime : newOptions.highlightedRange.endTime }
				)),
				plotBands: newOptions.plotBands.map(plotBand => ({...plotBand, color: CHART_OPTIONS.PLOT_BAND_COLOR})),
				scrollbar: {
					enabled: true
				}
			}
		}
	}
}
