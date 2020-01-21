import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';

@Component({
  selector: 'app-step-match-overview',
  templateUrl: './step-match-overview.component.html',
  styleUrls: ['./step-match-overview.component.scss']
})
export class StepMatchOverviewComponent implements OnInit {
  @Input() stepMatchOverviewData: any;
  @Output() stepSelectionEmitter = new EventEmitter<number>();
  matchesTags;

  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {
    
  }
  
  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('changes: ', changes);
  // }

  nextStep() {
    this.teamEventValidationService.matchDataOutput.step1OverviewData = this.stepMatchOverviewData;
    this.stepSelectionEmitter.emit(1);
  }

  onTagsEmitter(tags) {
    console.log(tags);
    this.matchesTags = tags;
  }
}
