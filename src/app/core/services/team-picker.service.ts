import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamPickerService {
  private currentTeam = 'hull-u18';
  private currentTeamUpdated = new BehaviorSubject<string>('hull-u18');

  constructor(private http: HttpClient) { }

  getCurrentTeamUpdateListener() {
    return this.currentTeamUpdated.asObservable();
  }

  getCurrentTeam() {
    return this.currentTeam;
  }

  setCurrentTeam(team: string) {
    console.log('team: ', team);

    this.http
      .get('assets/mocks/players-mock.json') // depands on the team argument
      .subscribe((players) => {
        console.log('players: ', players);
      });
 
    this.http
      .get('assets/mocks/team-events-mock.json') // depands on the team-events argument
      .subscribe((teamEvents) => {
        console.log('teamEvents: ', teamEvents);
      });

    this.currentTeam = team;
    this.currentTeamUpdated.next(team);
  }
}
