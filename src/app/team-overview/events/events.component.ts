import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  isLoading = false;

  constructor() { }

  ngOnInit() {
  }

  onRefresh() {
    this.isLoading = true;
    setTimeout(() => { this.isLoading = false }, 2000);
  }
}
