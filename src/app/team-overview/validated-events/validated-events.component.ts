import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { fadeInOutAnimation } from 'src/app/core/animations/fade-in-out.animation';
import { TEAM_EVENTS_VALIDATED_DATA } from 'server/data/team-events-validated.data';
import { EventsCarouselModalComponent } from '../events-carousel/events-carousel-modal/events-carousel-modal.component';
import { MatDialog } from '@angular/material';
import { UiComponentsService } from 'src/app/core/services/ui-components.service';
import { enumToString } from 'src/app/core/helpers/helper-functions';
import { teamEvents } from 'src/app/core/enums/team-events.enum';
import { Router } from '@angular/router';

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
  
  constructor(
    private dialog: MatDialog,
     private uiComponentsService: UiComponentsService,
     private router: Router
  ) { }

  ngOnInit() {
    of(TEAM_EVENTS_VALIDATED_DATA)
    // .pipe(
    //   map((loginData: any) => loginData.payload),
    // )
    .subscribe((result: any) => {
      console.log('result: ', result);
      this.teamEvents = result; // only validated team-events
      this.isTeamEventsLoading = false;
    });
  }

  onEditSession(teamEvent) {
    const teamEventString = enumToString(teamEvents, teamEvent.teamEventType).toLowerCase().trim();
    this.uiComponentsService.setIsLoading(true);
    setTimeout(() => { 
      this.uiComponentsService.setIsLoading(false);
      this.router.navigate([`/team-event-validation/${teamEventString}/${teamEvent.teamEventId}`]);
     }, 1000);
  }

  onDeleteSession(teamEventId) {
    console.log('teamEventId: ', teamEventId);

    const modalTitle = 'Delete Session';
    const modalMessage = `Are you sure you want to delete ${teamEventId} session?`;
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
          setTimeout(() => { 
            this.uiComponentsService.setIsLoading(false);
              const teamIndex = this.teamEvents.findIndex((teamEvent) => teamEvent.id === teamEventId );
              this.teamEvents.splice(teamIndex, 1);
           }, 2000);
        }
      });
  }
}
