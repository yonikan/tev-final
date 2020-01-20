import { Component, OnInit, Input } from '@angular/core';
import { TeamEventValidationService } from '../team-event-validation.service';
import { UiComponentsService } from '../../core/services/ui-components.service';

@Component({
  selector: 'app-training-validation',
  templateUrl: './training-validation.component.html',
  styleUrls: ['./training-validation.component.scss']
})
export class TrainingValidationComponent implements OnInit {
  @Input() trainingId: number;
  isLoading = true;
  currentSelectedStep = 0;
  step1Data: any;
  step2Data: any;
  step3Data: any;

  constructor(
    private teamEventValidationService: TeamEventValidationService,
    private uiComponentsService: UiComponentsService
  ) { }

  ngOnInit() {
    console.log(this.trainingId);
    this.teamEventValidationService.getTrainingData(this.trainingId)
      .subscribe(
        (trainingResp: any) => {
          this.isLoading = false;
          this.step1Data = trainingResp.metadata;
          this.step2Data = trainingResp.participatingPlayers;
          this.step3Data = trainingResp.phases;
        },
        (error) => {
          console.log('error: ', error);
        }
      );
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
}
