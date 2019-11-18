import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TeamPickerService } from '../core/team-picker/team-picker.service';
import { AuthorizationService } from '../core/services/authorization.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss']
})
export class TeamOverviewComponent implements OnInit, OnDestroy {
  pageName = 'team overview';
  private currentTeamUpdateSub: Subscription;
  isLoading = true;
  isLoadRiskFeatureEnabled = false;
  isPerformanceOvertimeFeatureEnabled = false;
  isLeaderBoardFeatureEnabled = false;

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
    private dialog: MatDialog,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit() {
    // this.isLoadRiskFeatureEnabled = this.authorizationService.isFeatureEnabled('loadRisk');
    this.isLoadRiskFeatureEnabled = true;
    // this.isPerformanceOvertimeFeatureEnabled = this.authorizationService.isFeatureEnabled('performanceOvertime');
    this.isPerformanceOvertimeFeatureEnabled = true;
    // this.isLeaderBoardFeatureEnabled = this.authorizationService.isFeatureEnabled('leaderBoard');
    this.isLeaderBoardFeatureEnabled = true;

    this.isLoading = true;

    this.currentTeamUpdateSub = this.teamPickerService
      .getCurrentTeamUpdateListener()
      .subscribe(currentTeam => {
        // console.log('TEAM OVERVIEW - currentTeam: ', currentTeam);
        this.isLoading = false;
      });

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

  ngOnDestroy(){
    this.currentTeamUpdateSub.unsubscribe();
  }
}
