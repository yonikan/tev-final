import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-team-overview-kpi',
  templateUrl: './team-overview-kpi.component.html',
  styleUrls: ['./team-overview-kpi.component.scss']
})
export class TeamOverviewKpiComponent implements OnInit {
  @Input() kpiData: any; 
  @Output() selectedKpiEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    console.log('kpiData: ', this.kpiData);

  }

  onClickTest() {
    console.log('kpi # was selected');
  }
}
