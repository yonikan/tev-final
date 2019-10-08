import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/core/services/ui.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  isLoading = false;
  isConfirmed = false;

  constructor(private uiService: UIService) { }

  ngOnInit() {
  }

  onRefresh() {
    this.isLoading = true;
    setTimeout(() => {
       this.isLoading = false;
       this.isConfirmed = true;
       this.uiService.showSnackbar('The event has been confirmed', null, 2000);
    }, 2000);
  }
}
