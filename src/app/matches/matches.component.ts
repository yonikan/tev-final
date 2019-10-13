import { Component, OnInit, OnDestroy } from '@angular/core';;
import { TeamPickerService } from '../core/services/team-picker.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UIService } from '../core/services/ui.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit, OnDestroy {
  pageName = 'matches';
  private currentTeamUpdateSub: Subscription;

  currentTeam;
  isLoading = true;;

  constructor(
    public teamPickerService: TeamPickerService,
    private uiService: UIService,
    private router: Router) 
  {}

  ngOnInit() {
    this.currentTeam = this.teamPickerService.getCurrentTeam();
    // this.isLoading = true;

    this.currentTeamUpdateSub = this.teamPickerService
      .getCurrentTeamUpdateListener()
      .subscribe(currentTeam => {
        this.isLoading = true;
        setTimeout(() => {
          console.log('currentTeam: ', currentTeam);
          this.isLoading = false;
          const toastText = `The team has changed to ${currentTeam}`;
          this.uiService.showSnackbar(toastText, null, 1000);
          // this.router.navigate(['/team-overview']);
        }, 2000);
      });
  }

  ngOnDestroy(){
    this.currentTeamUpdateSub.unsubscribe();
  }
}
