import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { map, tap, filter, skip } from 'rxjs/operators';
// import { UIService } from './ui.service';
// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeamPickerService {
  private currentTeam = 'hull-u18';
  // private currentTeamUpdated = new Subject<any>();
  private currentTeamUpdated = new BehaviorSubject<string>('hull-u18');

  constructor(
    private http: HttpClient, 
    private localStorageService: LocalStorageService, 
    // private uiService: UIService,  
    // private router: Router
  ) { }

  getCurrentTeamUpdateListener() {
    return this.currentTeamUpdated.asObservable();
  }

  getCurrentTeam() {
    return this.currentTeam;
  }

  setCurrentTeam(currentTeam: string) {
    this.http
      .get('assets/mocks/teams-mock.json')
      .pipe(
        // tap(teams => { console.log('teams: ', teams) }),
        map((teams: any) => teams.teamsData), // transform respond
        map((teams: any) => teams.find(team => team.teamName === currentTeam)), // select the selected team - temp
        // tap(teamFiltered => { console.log('teamFiltered: ', teamFiltered) })
        // skip(1)
      )
      .subscribe((currentTeam1: any) => {
        // console.log('currentTeam1: ', currentTeam1);
        this.currentTeam = currentTeam1;
        this.currentTeamUpdated.next(currentTeam1);
        // const toastText = `The team has changed to ${currentTeam1.teamName}`;
        // this.uiService.showSnackbar(toastText, null, 1000);
        // this.router.navigate(['/team-overview']);
      });

    this.currentTeam = currentTeam;
    this.localStorageService.storeOnLocalStorage('selected_team', currentTeam);
  }
}
