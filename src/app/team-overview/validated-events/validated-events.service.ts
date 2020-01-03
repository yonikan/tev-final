import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatedEventsService {
  individualPlayersReportPollInterval;
  individualPlayersReportJobStatusSucceed;
  individualPlayersReportStatus;

  constructor() { }

  getIndividualPlayersReport() {
    // this.$refs['individualPlayersReportModal'].show()

    let jobId;
    // const teamEventId = Number(this.$route.params.training_id);
    const teamEventId = null;

    // const userId = this.$store.getters.user.user_id;
    const userId = null;

    const reportType = 'individual';
    // const language = this.$i18n.locale;
    const language = null;

    const payload = {
      teamEventId: teamEventId,
      userId: userId,
      reportType: reportType,
      language: language
    };

    // this.postData(`v2/team-event/${teamEventId}/scheduled-jobs`, payload, 2)
    //     .then((response) => {
    //       if (response.body.scheduledJobId) {
    //         jobId = response.body.scheduledJobId
    //         this.fetchIndividualPlayersReportData(jobId, teamEventId)
    //       } else {
    //         // this.$refs['individualPlayersReportErrorModal'].show()
    //       }
    //     })
  }

  fetchIndividualPlayersReportData(jobId, teamEventId) {
    this.individualPlayersReportPollInterval = setInterval(this.pollIndividualPlayersReportData, 3000, jobId, teamEventId)
    setTimeout(() => { this.clearIntervalEndTimer('failedToRetrieve') }, 120000)
  }

  pollIndividualPlayersReportData(jobId, teamEventId) {
    // this.getData(`v2/team-event/${teamEventId}/scheduled-jobs/${jobId}/status`, 2)
    //   .then((response) => {
    //     if (response.body.jobStatus === 'succeed') { // check if status is success, if it is stop polling 
    //       this.individualPlayersReportJobStatusSucceed = true
    //       this.clearIntervalEndTimer('succeedToRetrieve')
    //     }
    //     this.individualPlayersReportStatus = response.body.jobStatus
    //   })
  }

  clearIntervalEndTimer(retStatus) {
    clearInterval(this.individualPlayersReportPollInterval)
    if (retStatus === 'succeedToRetrieve') {
      // this.$refs['individualPlayersReportSuccessModal'].show()
    } else if (retStatus === 'failedToRetrieve' && this.individualPlayersReportJobStatusSucceed === false) {
      // this.$refs['individualPlayersReportErrorModal'].show()
    }
  }

}




//  ======== sendTeamEventScheduledJobs
// POST  - v2/team-event/{teamEventId}/scheduled-jobs

// payload: {
//   “teamEventId” : <Long>,
//   “reportType” : <String>,
//   “userId” : <Long>,
//   “language” : <String>,
// }

// 200
// {“scheduledJobId” : <id>}
// }

// reportType : is one of [individual / possession]
// language : is one of [en / es / ch]





//  ======== checkTeamEventScheduledJobsStatus
// GET  -  v2/team-event/{teamEventId}/scheduled-jobs/{scheduledJobId}/status

// 200
// {
//   “scheduledJobId” : <Long>,
//    “jobStatus” : <String>,
//    “jobStartTime” : <Long>,
//    “jobEndTime” : <Long>
//  }
 
//  jobStatus  new/succeed/failedd}