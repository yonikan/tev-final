import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-participating-column',
  templateUrl: './participating-column.component.html',
  styleUrls: ['./participating-column.component.scss']
})
export class ParticipatingColumnComponent implements OnInit {
  @Input() players = [];
  @Input() actionName = '';

  constructor() { }

  ngOnInit() {
  }

  preventDetailsOpen(e) {
	  e.preventDefault();
  }

  openSummary() {

  }

}
