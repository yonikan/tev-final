import { Component, OnInit } from '@angular/core';;
import { TeamPickerService } from '../core/services/team-picker.service';
import { UIService } from '../core/services/ui.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  pageName = 'matches';
  currentTeam = '';

  isLoading = true;

  constructor(public teamPickerService: TeamPickerService, private uiService: UIService) { }

  ngOnInit() {
    this.currentTeam = this.teamPickerService.getCurrentTeam();

    this.teamPickerService.getCurrentTeamUpdateListener()
      .subscribe( teamEvents => {
              console.log(teamEvents);
            //   setTimeout(() => {
            //     this.isLoading = false;
            //     this.uiService.showSnackbar('The team has changed', null, 1000);
            // }, 2000);

      });
  }
}
