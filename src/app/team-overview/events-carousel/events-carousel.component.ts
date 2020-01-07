import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { EventsCarouselModalComponent } from './events-carousel-modal/events-carousel-modal.component';
import { fadeInOutAnimation } from '../../core/animations/fade-in-out.animation';
import { ServerEnvService } from '../../core/services/server-env.service';
import { TEAM_EVENTS_DATA } from 'server/data/team-events.data';
import { of } from 'rxjs';
import { UiComponentsService } from '../../core/services/ui-components.service';
import { Router } from '@angular/router';
import { enumToString } from '../../core/helpers/helper-functions';
import { teamEvents } from '../../core/enums/team-events.enum';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-events-carousel',
  templateUrl: './events-carousel.component.html',
  styleUrls: ['./events-carousel.component.scss'],
  animations: [fadeInOutAnimation]
})
export class EventsCarouselComponent implements OnInit {
  isTeamEventsLoading = true;
  teamEvents = [];
  index = 0;
  config: SwiperConfigInterface = {
    direction: 'horizontal',
    keyboard: true,
    grabCursor: true,
    observer: true,
    spaceBetween: 30,
    slidesPerView: 5.2,
    breakpoints: {
      1025: {
        slidesPerView: 1.2
      },
      1441: {
        slidesPerView: 2.2
      },
      1921: {
        slidesPerView: 3.2
      },
      2300: {
        slidesPerView: 4.2
      }
    }
  };
  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private serverEnvService: ServerEnvService,
    private uiComponentsService: UiComponentsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    of(TEAM_EVENTS_DATA)
    // const TEAM_ID = this.authService.getUserLoginData().teams[0].id;
    // const BASE_URL = this.serverEnvService.getBaseUrl();
    // const API_VERSION = 'v2';
    // this.http
    //   .get<any>(`${BASE_URL}/${API_VERSION}/team/${TEAM_ID}/team-events/unvalidated`)
      .subscribe((result: any) => {
        console.log('result: ', result);
        this.teamEvents = result;
        this.isTeamEventsLoading = false;
      }, (err) => {
        console.log('err: ', err);
      });
  }

  onConfirmSession(teamEvent) {
    console.log('teamEvent: ', teamEvent);
    // const teamEventString = enumToString(teamEvents, teamEvent.teamEventType).toLowerCase().trim();
    // this.uiComponentsService.setIsLoading(true);
    // setTimeout(() => { 
    //   this.uiComponentsService.setIsLoading(false);
    //   this.router.navigate([`/team-event-validation/${teamEventString}/${teamEvent.teamEventId}`]);
    //  }, 1000);
  }

  onConvertSession(teamEvent) {
    const modalTitle = 'Convert Session';
    const modalMessage = `Are you sure you want to convert the session?`;
    const dialogRef = this.dialog.open(EventsCarouselModalComponent, {
      width: '500px',
      height: '200px',
      data: { 
        title: modalTitle,
        message: modalMessage,
        modalData: teamEvent
      }
    });

    dialogRef.afterClosed()
      .subscribe(teamEventId => {
        console.log('teamEventId: ', teamEventId);
        if(teamEvent) {
          // this.uiComponentsService.setIsLoading(true);
          // setTimeout(() => { 
          //   this.uiComponentsService.setIsLoading(false);
          //  }, 2000);

          this.uiComponentsService.setIsLoading(true);
          let changeToEventType: number;
          if(teamEvent.teamEventType === 1) {
            changeToEventType = 2;
          } else if(teamEvent.teamEventType === 2) {
            changeToEventType = 1;
          }
          const PAYLOAD = {
            type: changeToEventType
          };
          this.http
            .put<any>(`https://football-dev.playermaker.co.uk/api/v1/team_event/${teamEvent.teamEventId}`, PAYLOAD)
            .subscribe((result: any) => {
              console.log('result: ', result);
              this.uiComponentsService.setIsLoading(false);
            }, (err) => {
              this.uiComponentsService.setIsLoading(false);
            });
        }
      });
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
      .subscribe(teamEventId => {
        console.log('teamEventId: ', teamEventId);
        if(teamEventId) {
          this.uiComponentsService.setIsLoading(true);
          // setTimeout(() => { 
          //     this.uiComponentsService.setIsLoading(false);
          //     const teamIndex = this.teamEvents.findIndex((teamEvent) => teamEvent.id === teamEventId );
          //     this.teamEvents.splice(teamIndex, 1);
          //  }, 2000);
          this.http
            .delete<any>(`https://football-dev.playermaker.co.uk/api/v1/team_event/${teamEventId}`)
            .subscribe((result: any) => {
              this.uiComponentsService.setIsLoading(false);
              const teamIndex = this.teamEvents.findIndex((teamEvent) => teamEvent.id === teamEventId );
              this.teamEvents.splice(teamIndex, 1);
            }, (err) => {
              this.uiComponentsService.setIsLoading(false);
            });
        }
      });
  }
}
