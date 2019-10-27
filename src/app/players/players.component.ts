import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamPickerService } from '../core/services/team-picker.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit, OnDestroy {
  pageName = 'players';
  private currentTeamUpdateSub: Subscription;
  isLoading = true;;

  constructor(public teamPickerService: TeamPickerService) { }

  ngOnInit() {
    this.isLoading = true;

    this.currentTeamUpdateSub = this.teamPickerService
      .getCurrentTeamUpdateListener()
      .subscribe(currentTeam => {
        // console.log('PLAYERS - currentTeam: ', currentTeam);
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.currentTeamUpdateSub.unsubscribe();
  }
}
