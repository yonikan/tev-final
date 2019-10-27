import { Component, OnInit, OnDestroy } from '@angular/core';;
import { TeamPickerService } from '../core/services/team-picker.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit, OnDestroy {
  pageName = 'matches';
  private currentTeamUpdateSub: Subscription;
  isLoading = true;;

  constructor(public teamPickerService: TeamPickerService) {}

  ngOnInit() {
    this.isLoading = true;

    this.currentTeamUpdateSub = this.teamPickerService
      .getCurrentTeamUpdateListener()
      .subscribe(currentTeam => {
        // console.log('MATCHES - currentTeam: ', currentTeam);
        this.isLoading = false;
        // setTimeout(() => {
        //   // console.log('MATCHES - currentTeam: ', currentTeam);
        //   // this.isLoading = false;
        //   // const toastText = `The team has changed to ${currentTeam}`;
        //   // this.uiService.showSnackbar(toastText, null, 1000);
        // }, 2000);
      });
  }

  ngOnDestroy(){
    this.currentTeamUpdateSub.unsubscribe();
  }
}
