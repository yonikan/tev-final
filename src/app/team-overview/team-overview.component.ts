import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamPickerService } from '../core/services/team-picker.service';
import { AuthorizationService } from '../core/services/authorization.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
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
    // mousewheel: true,
    // scrollbar: false,
    // centeredSlides: true,
    // loop: true,
    // slidesPerView: 'auto',
    // navigation: false,
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
    // pagination: true,
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true,
    //   renderBullet: function (index, className) {
    //     return '<span class="' + className + '">' + (index + 1) + '</span>';
    //   },
    // },
    // pagination: {
    //   el: '.swiper-pagination',
    //   // clickable: true,
    //   // type: 'bullets',
    //   // dynamicBullets: true,
    //   // dynamicMainBullets: 2
    // },
    spaceBetween: 30,
    slidesPerView: 3.2,
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
        // console.log('this.teamEvents: ', this.teamEvents);
        this.isTeamEventsLoading = false;
      });
  }

  testAppend () {
    // this.config.
  }

  onConfirmSession() {

  }

  onDeleteSession() {
    const modalTitle = 'Delete Session';
    const modalMessage = 'Are you sure you want to delete this session?';
    this.dialog.open(ModalComponent, {
      width: '500px',
      height: '200px',
      data: { 
        title: modalTitle,
        message: modalMessage
      }
    });
  }

  onTeamEventEmitter(teamEventId) {
    const modalTitle = 'Delete Session';
    const modalMessage = `Are you sure you want to delete ${teamEventId} session?`;
    this.dialog.open(ModalComponent, {
      width: '500px',
      height: '200px',
      data: { 
        title: modalTitle,
        message: modalMessage
      }
    });
  }

  ngOnDestroy(){
    this.currentTeamUpdateSub.unsubscribe();
  }
}
