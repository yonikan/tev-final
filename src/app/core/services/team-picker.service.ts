import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { map, tap } from 'rxjs/operators';
import { UIService } from './ui.service';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class TeamPickerService {
  private currentTeam = 'hull-u18';
  private currentTeamUpdated = new BehaviorSubject<string>('hull-u18');

  constructor(
    private http: HttpClient, 
    private localStorageService: LocalStorageService, 
    private authorizationService: AuthorizationService,
    private uiService: UIService
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
        map((teams: any) => teams.teamsData), // transform respond
        // tap(team => { console.log('team: ', team) }),
        map((teams: any) => teams.find(team => team.teamName === currentTeam)), // select the selected team - temp
        // tap(teamFiltered => { console.log('teamFiltered: ', teamFiltered) })
      )
      .subscribe((updatedTeam: any) => {
        this.authorizationService.teamAuthorization(updatedTeam.teamName); // hard-coded for now
        this.currentTeam = updatedTeam;
        this.currentTeamUpdated.next(updatedTeam);
      });

    this.currentTeam = currentTeam;
    this.localStorageService.storeOnLocalStorage('selected_team', currentTeam);
  }
}
