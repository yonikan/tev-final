import { Component, OnInit } from '@angular/core';
import { fadeInOutAnimation } from '../../core/animations/fade-in-out.animation';
import { EventsCarouselModalComponent } from '../events-carousel/events-carousel-modal/events-carousel-modal.component';
import { MatDialog } from '@angular/material';
import { UiComponentsService } from '../../core/services/ui-components.service';
import { ServerEnvService } from '../../core/services/server-env.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-validated-events',
  templateUrl: './validated-events.component.html',
  styleUrls: ['./validated-events.component.scss'],
  animations: [fadeInOutAnimation]
})
export class ValidatedEventsComponent implements OnInit {
  teamEvents;
  isTeamEventsLoading;
  index = 0;
  isLoading = true;
  
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private http: HttpClient,
    private serverEnvService: ServerEnvService,
    private uiComponentsService: UiComponentsService
  ) { }

  ngOnInit() {
    const TEAM_ID = this.authService.getUserLoginData().teams[0].id;
    const BASE_URL = this.serverEnvService.getBaseUrl();
    const API_VERSION = 'v2';
    this.http
      .get<any>(`${BASE_URL}/${API_VERSION}/team/${TEAM_ID}/team-events`)
      .subscribe((result: any) => {
        this.teamEvents = result; // only validated team-events
        this.isLoading = false;
        this.isTeamEventsLoading = false;
      }, (err) => {
        console.log('err: ', err);
      });
  }

  onEditSession(teamEvent) {
    this.uiComponentsService.setIsSidepanelOpen(
      {isOpen: true, teamEventType: teamEvent.teamEventType, teamEventId: teamEvent.teamEventId, isTeamEventValidationFinished: false}
    );
  }

  onDeleteSession(teamEventId) {
    const modalTitle = 'Delete Session';
    const modalMessage = `Are you sure you want to delete the session?`;
    const dialogRef = this.dialog.open(EventsCarouselModalComponent, {
      width: '500px',
      height: '200px',
      data: { 
        title: modalTitle,
        message: modalMessage,
        modalData: teamEventId
      }
    });
    dialogRef.afterClosed()
      .subscribe(modalData => {
        if(modalData) {
          this.uiComponentsService.setIsLoading(true);
          this.http
            .delete<any>(`https://football-dev.playermaker.co.uk/api/v1/team_event/${teamEventId}`)
            .subscribe((result: any) => {
              this.uiComponentsService.setIsLoading(false);
              const teamIndex = this.teamEvents.findIndex((teamEvent) => teamEvent.id === teamEventId );
              this.teamEvents.splice(teamIndex, 1);
            }, (err) => {
              console.log('err: ', err);
            });
        }
      });
  }

  onDownloadPdfReport(report) {
    console.log('report: ', report);
  }
}
