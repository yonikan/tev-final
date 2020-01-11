import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ServerEnvService } from 'src/app/core/services/server-env.service';
import { map } from 'rxjs/operators';
import { ErrorModalComponent } from 'src/app/core/components/error-modal/error-modal.component';
import { ValidatedEventsToastComponent } from 'src/app/core/components/validated-events-toast/validated-events-toast.component';

@Injectable({
  providedIn: 'root'
})
export class ValidatedEventsService {
  individualPlayersReportPollInterval;
  individualPlayersReportJobStatusSucceed;
  individualPlayersReportStatus;
  private userLoginDataSub: Subscription; // maybe preffered local storage - i dont have onDestory to unsebsribe!
  userId: number;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private dialog: MatDialog,
    // private uiComponentsService: UiComponentsService,
    private snackbar: MatSnackBar,
    private serverEnvService: ServerEnvService
  ) { }

  getTeamEventPdfReport(teamEventId: number, reportType: string) {

    // this.uiComponentsService.showSnackbar('Pdf report is being generated', null);
    this.snackbar.openFromComponent(ValidatedEventsToastComponent);
    // this.snackbar.open('Download In Progress', null);
    
    this.userLoginDataSub = this.authService
      .getUserLoginDataListener()
      .pipe(
        map(loginData => loginData.userId)
      )
      .subscribe((userId: number) => {
        console.log('userId: ', userId);
        this.userId = userId;
      });

    let pdfReportType;
    if (reportType === 'teamReport') {
      pdfReportType = 'teamPdfReport';
    } else if (reportType === 'individualReport') {
      pdfReportType = 'individual';
    };

    const payload = {
      teamEventId,
      userId: this.userId,
      reportType: pdfReportType,
      language: 'en'
    };
    const PATH = this.serverEnvService.getBaseUrl();
    this.http.post<any>(`${PATH}/v2/team-event/${teamEventId}/scheduled-jobs`, payload)
      .subscribe(
        (response: any) => {
          if (response.scheduledJobId) {
            const JOB_ID = response.scheduledJobId;
            this.fetchPdfReportData(JOB_ID, teamEventId);
          } else {
            console.log('individual Players Report Error!!!');
            // this.$refs['individualPlayersReportErrorModal'].show()
          }
        },
        (error) => {
          console.log('error: ', error);
          this.snackbar.dismiss();
          this.openValidatedEventsModal('errorModal');
        }
      );
  }

  fetchPdfReportData(jobId: number, teamEventId: number) {
    // this.pollPdfReportData(jobId, teamEventId);
    this.individualPlayersReportPollInterval = setInterval(this.pollPdfReportData.bind(this), 3000, jobId, teamEventId);
    setTimeout(() => { 
      this.clearIntervalEndTimer('failedToRetrieve');
    }, 120000);
  }

  pollPdfReportData(jobId: number, teamEventId: number) {
    const PATH = this.serverEnvService.getBaseUrl();
    this.http.get<any>(`${PATH}/v2/team-event/${teamEventId}/scheduled-jobs/${jobId}/status`)
      .subscribe(
        (response: any) => {
          if (response.jobStatus === 'succeed') { // check if status is success, if it is stop polling 
            this.individualPlayersReportJobStatusSucceed = true;
            this.clearIntervalEndTimer('succeedToRetrieve');
          }
          this.individualPlayersReportStatus = response.jobStatus;
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }

  clearIntervalEndTimer(retStatus: string) {
    console.log('=========== retStatus: ', retStatus);
    clearInterval(this.individualPlayersReportPollInterval);
    this.snackbar.dismiss();

    if (retStatus === 'succeedToRetrieve') {
      console.log('succeed To Retrieve!!!');
      this.openValidatedEventsModal('successModal');
    // } else if (retStatus === 'failedToRetrieve' && this.individualPlayersReportJobStatusSucceed === false) {
    } else if (retStatus === 'failedToRetrieve') {
      console.log('individual Players Report Error!!!');
      this.openValidatedEventsModal('errorModal');
    }
  }

  openValidatedEventsModal(modalType) {
    let modalTitle;
    let modalMessage;
    if (modalType === 'successModal') {
      modalTitle = 'File Successfully Downloaded';
      modalMessage = `All the reports were sent to your email.`;
    } else if (modalType === 'errorModal') {
      modalTitle = 'Download Failed';
      modalMessage = `The file you requested could not be downloaded. Please try again later or contact support.`;
    }

    this.dialog.open(ErrorModalComponent, {
      width: '500px',
      height: '200px',
      data: { 
        title: modalTitle,
        message: modalMessage
      }
    });
  }
}