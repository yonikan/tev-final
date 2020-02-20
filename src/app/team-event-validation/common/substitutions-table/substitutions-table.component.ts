import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { objToArray, sortFunction } from '../../../core/helpers/helper-functions';
import { TeamEventValidationService } from '../../team-event-validation.service';

@Component({
  selector: 'substitutions-table',
  templateUrl: './substitutions-table.component.html',
  styleUrls: ['./substitutions-table.component.scss']
})
export class SubstitutionsTableComponent implements OnInit, OnChanges {

  tableSizeConfig = {
    Minute: '9%',
    In: '14%',
    Out: '14%',
    Position: '39%',
    buttons: '9%'
  }

  @Input() substitutions = [];
  @Input() suggestedSubs = [];
  @Output() subsEmitter = new EventEmitter<any>();

  lineup;
  availableForSub;
  subFormationPerMinute = {};
  emptySubstitution = { timeMin: '', inPlayerId: '', outPlayerId: '', defaultPositionId: '', type: '', id: '' };
  Object = Object;
  Math = Math;

  constructor(private teamEventValidationService: TeamEventValidationService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges(change) {
    if (!this.subFormationPerMinute[0]) { this.initSubFormationByMinute(); };
    if (this.substitutions && change.substitutions && this.subFormationPerMinute[0]) {
      this.sortSubstitutions();
      this.buildSubFormationForAllSubs();
      this.validateAllSubs();
      this.cd.detectChanges();
      // if (this.teamEventValidationService.checkIfAllSubsAreValid()) { this.sendToTeamEvent(this.substitutions) };
      console.log('subFormationPerMinute: ', this.subFormationPerMinute);
      console.log('substitutions: ', this.substitutions);
      console.log('checkIfAllSubsAreValid: ', this.teamEventValidationService.checkIfAllSubsAreValid());
    }
  }

  initSubFormationByMinute() {
    this.subFormationPerMinute[0] = {
      lineup: this.teamEventValidationService.lineup,
      availableForSub: this.teamEventValidationService.availableForSub
    };
    this.buildSubFormationForAllSubs();
    this.ngOnChanges({ substitutions: this.substitutions });
  }

  buildSubFormationForAllSubs() {
    this.substitutions.forEach((sub, i) => {
      this.buildSubFormationByMinute(sub, i);
    })
  }
  sortSubstitutions() {
    this.substitutions = this.substitutions.sort((a, b) => {
      return sortFunction(b, a, ['timeMin']);
    });
    console.log(this.substitutions)
  }

  removeRow(substitutionToRemove, mode) {
    const substitutionIndex = this.substitutions.findIndex(substitution => substitution.id === substitutionToRemove.id);
    if (mode === 'GENERAL') { this.substitutions.splice(substitutionIndex, 1); }
    if (mode === 'SUGGESTED') { this.suggestedSubs.splice(substitutionIndex, 1); }
  }

  addRow(substitutionToAdd) {
    this.substitutions.push(substitutionToAdd);
    this.ngOnChanges({ substitutions: this.substitutions });
  }

  editRow(substitutionToEdit) {
    const substitutionIndex = this.substitutions.findIndex(substitution => substitution.id === substitutionToEdit.id);
    if (substitutionIndex !== -1) {
      this.substitutions[substitutionIndex] = substitutionToEdit;
      this.ngOnChanges({ substitutions: this.substitutions });
    }
  }

  sendToTeamEvent(data) {
    this.subsEmitter.emit(data);
  }

  buildSubFormationByMinute(sub, index?) {
    index = index || index === 0 ? index : this.getSubIndex(sub.timeMin);
    const prevSub = index > 0 ? this.subFormationPerMinute[this.substitutions[index - 1].timeMin] : this.subFormationPerMinute[0];
    const currSub = JSON.parse(JSON.stringify(prevSub));
    const inPlayerIdx = currSub.availableForSub.findIndex(({ id }) => id === sub.inPlayerId);
    if (inPlayerIdx !== -1) {
      const inPlayer = currSub.availableForSub.splice(inPlayerIdx, 1);
      currSub.lineup.push(inPlayer[0]);
    }
    const outPlayerIdx = currSub.lineup.findIndex(({ id }) => id === sub.outPlayerId)
    if (outPlayerIdx !== -1) {
      const outPlayer = currSub.lineup.splice(outPlayerIdx, 1);
      currSub.availableForSub.push(outPlayer[0]);
    }
    this.subFormationPerMinute[sub.timeMin] = currSub;
    this.cd.detectChanges();
  }

  getSubIndex(minute) {
    let max = -Infinity
    let prevIdx = 0;
    this.substitutions.forEach((sub, i) => {
      if (sub.timeMin > max && sub.timeMin < minute) {
        max = sub.timeMin;
        prevIdx = i;
      }
    })
    return prevIdx + 1
  }

  validateAllSubs() {
    this.substitutions.forEach((substitution, i) => {
      this.validateSubtitution(substitution, i);
    });
  }

  validateSubtitution(substitutionForCheck, index) {
    let errorMassage = '';

    const matchDuraiton = this.teamEventValidationService.getMatchDuraiton();

    // check sub min is positive
    if (substitutionForCheck.timeMin < 0) {
      errorMassage += 'Subtitution time invalid, ';
    }

    // check sub min is in match Duraiton (+not 0)
    if (substitutionForCheck.timeMin === 0 || substitutionForCheck.timeMin > matchDuraiton) {
      errorMassage += 'Invalid match min, ';
    }

    // check sub playeres are valid
    {
      const prevSubFormation = index > 0 ? this.subFormationPerMinute[this.substitutions[index - 1].timeMin] : this.subFormationPerMinute[0]
      console.log('this.substitutions[index - 1].timeMin: ', this.substitutions[index > 0? index - 1:0].timeMin, 'substitutionForCheck: ', substitutionForCheck);
      const inPlayerIdx = prevSubFormation.availableForSub.findIndex(({ id }) => id === substitutionForCheck.inPlayerId)
      const outPlayerIdx = prevSubFormation.lineup.findIndex(({ id }) => id === substitutionForCheck.outPlayerId)
      if (inPlayerIdx === -1 || outPlayerIdx === -1) {
        errorMassage += `Invalid subbed ${inPlayerIdx === -1 ? 'in' : 'out'} Player, `;
      }
    }

    // check all fields are full
    {
      const keysToDisclude = ['id', 'errorMassage'];
      Object.keys(substitutionForCheck).every((key) => {
        if ((!substitutionForCheck.hasOwnProperty(key) || !substitutionForCheck[key]) && !keysToDisclude.includes(key)) {
          errorMassage += 'All fields must be full, ';
          return false;
        }
      });
    }

    substitutionForCheck.errorMassage = errorMassage.substring(0, errorMassage.length - 2);
  }

}
