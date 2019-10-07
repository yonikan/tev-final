import { Component, OnInit } from '@angular/core';
import { fadeInRightAnimation } from '../core/animations/fade-in-right.animation';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  animations: [fadeInRightAnimation]
})
export class ReportsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
