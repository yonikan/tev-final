import { Component, OnInit } from '@angular/core';;
import { TeamPickerService } from '../core/services/team-picker.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  pageName = 'matches';
  currentTeam = '';

  constructor(public teamPickerService: TeamPickerService) { }

  ngOnInit() {
    this.currentTeam = this.teamPickerService.getCurrentTeam();
  }
}
