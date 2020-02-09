import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TeamEventValidationService } from 'src/app/team-event-validation/team-event-validation.service';
import { objToArray } from '../../../../core/helpers/helper-functions';
@Component({
  selector: 'app-match-phase-modal',
  templateUrl: './match-phase-modal.component.html',
  styleUrls: ['./match-phase-modal.component.scss']
})
export class MatchPhaseModalComponent implements OnInit {

  @Input() phase;
  @Input() selectedLineup = {};
  @Output() updateField = new EventEmitter();

  lineup = [];
  lineupTitle;

  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {
    this.setSelectedLineup();
    this.lineup = objToArray(this.teamEventValidationService.getAllParticipatingPlayers(), 'id');
    this.setLineupTitle();
  }

  changePhaseName(value) {
    this.updateField.emit({ value, filedPathToUpdate: ['phaseName'] });
  }


  setSelectedLineup() {
    [0, 1, 2].forEach(team => {
      if (!this.selectedLineup.hasOwnProperty(team)) { this.selectedLineup[team] = [] };
    });
  }

  isSelected(id) {
    // id = +id;
    let res: any;
    Object.keys(this.selectedLineup).forEach((teamId) => {
      if (this.selectedLineup[+teamId].includes(+id)) { res = +teamId; };
    });
    return res;
  }

  setLineupTitle() {
    this.lineupTitle = this.selectedLineup[1].length;
  }


}
