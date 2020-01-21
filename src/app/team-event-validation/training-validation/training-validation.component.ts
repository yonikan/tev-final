import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TeamEventValidationService } from '../team-event-validation.service';
import { UiComponentsService } from '../../core/services/ui-components.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training-validation',
  templateUrl: './training-validation.component.html',
  styleUrls: ['./training-validation.component.scss']
})
export class TrainingValidationComponent implements OnInit, OnDestroy {
  @Input() trainingId: number;
  currentSelectedStep = 0;
  isLoading = true;
  step1Data: any;
  step2Data: any;
  step3Data: any;
  trainingValidationData: any;
  private trainingValidationDataSub: Subscription;

  constructor(
    private teamEventValidationService: TeamEventValidationService,
    private uiComponentsService: UiComponentsService
  ) { }

  ngOnInit() {
    console.log(this.trainingId);
    this.teamEventValidationService.fetchTraining(this.trainingId);
    this.trainingValidationDataSub = this.teamEventValidationService
      .getTrainingValidationDataListener()
      .subscribe((trainingValidationData: any) => {
        // console.log('trainingValidationData: ', trainingValidationData);
          this.isLoading = false;
          this.step1Data = trainingValidationData.metadata;
          this.step2Data = trainingValidationData.participatingPlayers;
          this.step3Data = trainingValidationData.phases;
      });
  }
  
  onStepSelectionEmitter(stepNumber) {
    // console.log('stepNumber: ', stepNumber);
    this.currentSelectedStep = stepNumber;
    if(stepNumber === 3) {
      this.isLoading = true;
      this.teamEventValidationService.validateTraining(this.trainingId)
        .subscribe(
          (trainingResp: any) => {
            this.isLoading = false;
            this.uiComponentsService.setIsSidepanelOpen({isOpen: false, teamEventType: null, teamEventId: null});
          },
          (error) => {
            console.log('error: ', error);
            this.isLoading = false;
            this.uiComponentsService.setIsSidepanelOpen({isOpen: false, teamEventType: null, teamEventId: null});
          }
        );
    }
  }

  ngOnDestroy() {
    this.trainingValidationDataSub.unsubscribe();
  }
}
