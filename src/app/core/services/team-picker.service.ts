import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { ServerEnvService } from './server-env.service';

@Injectable({
  providedIn: 'root'
})
export class TeamPickerService {
  private currentTeam = 'hull-u18';
  private currentTeamUpdated = new BehaviorSubject<string>('hull-u18');

  constructor(
    private http: HttpClient, 
    private localStorageService: LocalStorageService,
    private serverEnvService: ServerEnvService,
    private router: Router
  ) { }

  getCurrentTeamUpdateListener(): Observable<string> {
    return this.currentTeamUpdated.asObservable();
  }

  getCurrentTeam(): string {
    return this.currentTeam;
  }

  setCurrentTeam(currentTeam: string) {
    const PATH = this.serverEnvService.getBaseUrl();
    this.http
      .get<any>(`${PATH}/teams`)
      .pipe(
        // tap(results => { console.log('results: ', results) }),
        map((teamsData: any) => teamsData.payload.teamsData),
        // tap(results => { console.log('results: ', results) }),
        map((teams: any) => teams.find(team => team.teamName === currentTeam)),
        // tap(teamFiltered => { console.log('teamFiltered: ', teamFiltered) })
      )
      .subscribe((updatedTeam: any) => {
        // console.log('updatedTeam: ', updatedTeam);
        this.currentTeam = updatedTeam;
        this.currentTeamUpdated.next(updatedTeam);
        this.router.navigate(['team-overview']);
      });

    this.currentTeam = currentTeam;
    this.localStorageService.storeOnLocalStorage('selected_team', currentTeam);
  }
}
