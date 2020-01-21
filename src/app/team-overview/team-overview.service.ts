import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamOverviewService {
  private teamEventAfterValidation: any;
  private teamEventAfterValidationListener = new Subject<number>();
  
  constructor() { }

  getTeamEventAfterValidation(): any {
    return this.teamEventAfterValidation;
  }

  setTeamEventAfterValidation(teamEventId: number) {
    this.teamEventAfterValidation = teamEventId;
    this.teamEventAfterValidationListener.next(teamEventId);
  }

  getTeamEventAfterValidationListener(): Observable<any> {
    return this.teamEventAfterValidationListener.asObservable();
  }
}
