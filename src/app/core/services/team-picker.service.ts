import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TeamPickerService {
  private currentTeam = 'hull-u18';
  private currentTeamUpdated = new BehaviorSubject<string>('hull-u18');

  teamEvents;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  getCurrentTeamUpdateListener() {
    return this.currentTeamUpdated.asObservable();
  }

  getCurrentTeam() {
    return this.currentTeam;
  }

  setCurrentTeam(team: string) {
    this.http
      .get('assets/mocks/team-events-mock.json') // depands on the team-events argument
      .subscribe((teamEvents) => {
        this.teamEvents = teamEvents;
        this.currentTeamUpdated.next(this.teamEvents);
      });

    this.currentTeam = team; // we need the current team name also 
    this.localStorageService.storeOnLocalStorage('selected_team', team);
  }
}
