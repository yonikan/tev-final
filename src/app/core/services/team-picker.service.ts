import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ServerEnvService } from './server-env.service';

@Injectable({
  providedIn: 'root'
})
export class TeamPickerService {

  constructor(
    private http: HttpClient, 
    private serverEnvService: ServerEnvService,
    private router: Router
  ) { }

  setCurrentTeam(selectedTeam: string) {
    console.log('selectedTeam: ', selectedTeam);
    // const PATH = this.serverEnvService.getBaseUrl();
    // this.http
    //   .get<any>(`${PATH}/teams`)
    //   .pipe(
    //     // tap(results => { console.log('results: ', results) }),
    //     map((teamsData: any) => teamsData.payload.teams),
    //     // tap(results => { console.log('results: ', results) }),
    //     map((teams: any) => teams.find(team => team.name === selectedTeam)),
    //     // tap(teamFiltered => { console.log('teamFiltered: ', teamFiltered) })
    //   )
    //   .subscribe((team: any) => {
    //     console.log('team: ', team);
    //     this.router.navigate(['team-overview']);
    //   });
  }
}
