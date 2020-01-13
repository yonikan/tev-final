import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ServerEnvService } from '../../core/services/server-env.service';
import { map } from 'rxjs/operators';
import { ErrorModalComponent } from '../../core/components/error-modal/error-modal.component';
import { ValidatedEventsToastComponent } from '../../core/components/validated-events-toast/validated-events-toast.component';

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
    private snackbar: MatSnackBar,
    private serverEnvService: ServerEnvService
  ) { }

  getTeamEventPdfReport(teamEventId: number, reportType: string) {
    this.snackbar.openFromComponent(ValidatedEventsToastComponent);
    
    this.userLoginDataSub = this.authService
      .getUserLoginDataListener()
      .pipe(
        map(loginData => loginData.userId)
      )
      .subscribe((userId: number) => {
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
          }
        },
        (error) => {
          this.snackbar.dismiss();
          this.openValidatedEventsModal('errorModal');
        }
      );
  }

  fetchPdfReportData(jobId: number, teamEventId: number) {
    // this.pollPdfReportData(jobId, teamEventId);
    this.individualPlayersReportPollInterval = setInterval(this.pollPdfReportData.bind(this), 3000, jobId, teamEventId);
    setTimeout(() => { 
      // if(this.individualPlayersReportJobStatusSucceed === false) {
      //   this.clearIntervalEndTimer('failedToRetrieve');
      // }
      // this.individualPlayersReportJobStatusSucceed === false;
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
    clearInterval(this.individualPlayersReportPollInterval);
    this.snackbar.dismiss();

    if (retStatus === 'succeedToRetrieve') {
      this.openValidatedEventsModal('successModal');
    } else if (retStatus === 'failedToRetrieve' && this.individualPlayersReportJobStatusSucceed === false) {
      this.openValidatedEventsModal('errorModal');
    } else if (retStatus === 'failedToRetrieve' && this.individualPlayersReportStatus === 'new') {
      this.openValidatedEventsModal('errorModal');
    }
  }

  openValidatedEventsModal(modalType) {
    let modalTitle;
    let modalMessage;
    if (modalType === 'successModal') {
      modalTitle = 'Files Exported Successfully';
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