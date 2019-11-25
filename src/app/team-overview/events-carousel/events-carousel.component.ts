import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { EventsCarouselModalComponent } from './events-carousel-modal/events-carousel-modal.component';
import { TeamPickerService } from '../../core/services/team-picker.service';
import { fadeInOutAnimation } from '../../core/animations/fade-in-out.animation';
import { ServerEnvService } from '../../core/services/server-env.service';

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
    public teamPickerService: TeamPickerService,
    private http: HttpClient,
    private serverEnvService: ServerEnvService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const PATH = this.serverEnvService.getBaseUrl();
    this.http
      .get<any>(`${PATH}/team-events`)
      .pipe(
        map((loginData: any) => loginData.payload),
      )
      .subscribe((result: any) => {
        this.teamEvents = result.teamEventsData;
        this.isTeamEventsLoading = false;
      });
  }

  onConfirmSession(teamEventId) {
    console.log('teamEventId: ', teamEventId);
  }

  onDeleteSession(teamEventId) {
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
          const teamIndex = this.teamEvents.findIndex((teamEvent) => teamEvent.id === teamEventId );
          this.teamEvents.splice(teamIndex, 1);
        }
      });
  }
}
