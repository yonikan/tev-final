import { Component, OnInit } from '@angular/core';
import { fadeInUpAnimation } from '../core/animations/fade-in-up.animation';
import { TeamPickerService } from '../core/services/team-picker.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  animations: [fadeInUpAnimation]
})
export class MatchesComponent implements OnInit {

  currentTeam = '';

  constructor(public teamPickerService: TeamPickerService) { }

  ngOnInit() {
    this.currentTeam = this.teamPickerService.getCurrentTeam();
  }
}
