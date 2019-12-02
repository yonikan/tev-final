import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-overtime',
  templateUrl: './performance-overtime.component.html',
  styleUrls: ['./performance-overtime.component.scss']
})
export class PerformanceOvertimeComponent implements OnInit {
  test = [
    {
      name: 'ACWR',
      value: '4.5',
      change: '+2.5'
    },
    {
      name: 'ACWR1',
      value: '4.5',
      change: '+2.5'
    },
    {
      name: 'ACWR2',
      value: '4.5',
      change: '+2.5'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

  onSelectedKpiEmitter($event) {
    
  }
}
