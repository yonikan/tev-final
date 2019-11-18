import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TeamPickerService {
  private currentTeam = 'hull-u18';
  private currentTeamUpdated = new BehaviorSubject<string>('hull-u18');

  constructor(
    private http: HttpClient, 
    private localStorageService: LocalStorageService,
    private router: Router
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
        console.log('updatedTeam: ', updatedTeam);
        this.currentTeam = updatedTeam;
        this.currentTeamUpdated.next(updatedTeam);
        this.router.navigate(['team-overview']);
      });

    this.currentTeam = currentTeam;
    this.localStorageService.storeOnLocalStorage('selected_team', currentTeam);
  }
}
