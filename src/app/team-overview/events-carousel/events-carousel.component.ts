import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { TeamPickerService } from '../../core/services/team-picker.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-events-carousel',
  templateUrl: './events-carousel.component.html',
  styleUrls: ['./events-carousel.component.scss']
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
    slidesPerView: 3.2,
    // virtual: true,
    // virtual: {
    //   slides: ['Slide 1', 'Slide 2', 'Slide 3'],
    // },
    // virtual: {
    //   slides: this.teamEvents
    // },
    breakpoints: {
      // 380: {
      //   slidesPerView: 1.2,
      //   spaceBetween: 30
      // },
      768: {
        slidesPerView: 1.2,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 2.2,
        spaceBetween: 30
      }
    }
  };
  
  constructor(
    public teamPickerService: TeamPickerService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.http
    .get('./assets/mocks/team-events-mock.json')
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
    const dialogRef = this.dialog.open(ModalComponent, {
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
