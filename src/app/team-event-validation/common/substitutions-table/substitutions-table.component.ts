import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
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
  participationgPlayers
  Object = Object;

  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {
    this.participationgPlayers = Object.values(this.teamEventValidationService.getAllParticipatingPlayers());
    this.initSubFormationByMinute();
    console.log('subFormationPerMinute: ', this.subFormationPerMinute);
    console.log('substitutions: ', this.substitutions);
  }

  ngOnChanges(change) {
    if (this.substitutions && change.substitutions && this.subFormationPerMinute[0]) {
      this.sortSubstitutions();
      this.validateAllSubs();
    }
  }

  initSubFormationByMinute() {
    this.subFormationPerMinute[0] = {
      lineup: this.teamEventValidationService.lineup,
      availableForSub: this.teamEventValidationService.availableForSub
    };
    this.substitutions.forEach((sub, i) => {
      this.buildSubFormationByMinute(sub, i);
    })
    console.log(this.subFormationPerMinute)



    // if (minute === 0) {
    //   this.subFormationPerMinute[minute] = {
    //     lineup: this.teamEventValidationService.lineup,
    //     availableForSub: this.teamEventValidationService.availableForSub
    //   };
    // } else {
    //   const lastSub = this.substitutions[length - 1];
    //   this.subFormationPerMinute[minute] = this.participationgPlayers.reduce((playerId, acc) => {
    //     if (lastSub.inPlayerId === playerId) { acc.lineup.push(playerId); return acc; };
    //     if (lastSub.outPlayerId === playerId) { acc.availableForSub.push(playerId); return acc; };
    //     this.subFormationPerMinute[lastSub.timeMin].lineup.include(playerId) ? acc.lineup.push(playerId) : acc.availableForSub.push(playerId);
    //     return acc;
    //   }, { lineup: [], availableForSub: [] });
    // }
  }

  sortSubstitutions() {
    this.substitutions = this.substitutions.sort((a, b) => {
      return sortFunction(b, a, ['timeMin']);
    });
  }

  removeRow(substitutionToRemove, mode) { // TODO: remove player from availableForSub to lineup
    const substitutionIndex = this.substitutions.findIndex(substitution => substitution.id === substitutionToRemove.id);
    if (mode === 'GENERAL') { this.substitutions.splice(substitutionIndex, 1); }
    //  if (mode === 'NEW') { }
    if (mode === 'SUGGESTED') { this.suggestedSubs.splice(substitutionIndex, 1); }
    //  if (mode === 'EDIT') {  }
  }

  addRow(substitutionToAdd) { // TODO: remove player from lineup to availableForSub
    this.substitutions.push(substitutionToAdd);
    this.sortSubstitutions();
    // console.log(this.substitutions);
  }

  editRow(substitutionToEdit) {
    const substitutionIndex = this.substitutions.findIndex(substitution => substitution.id === substitutionToEdit.id);
    if (substitutionIndex !== -1) {
      this.substitutions[substitutionIndex] = substitutionToEdit;
    }
  }

  sendToTeamEvent(data) {
    this.subsEmitter.emit(data);
  }

  buildSubFormationByMinute(sub, i) {

    const prevSub = i > 0 ? this.subFormationPerMinute[this.substitutions[i - 1].timeMin] : this.subFormationPerMinute[0]
    const currSub = JSON.parse(JSON.stringify(prevSub))
    const inPlayerIdx = currSub.availableForSub.findIndex(({ id }) => id === sub.inPlayerId)
    if (inPlayerIdx !== -1) {
      const inPlayer = currSub.availableForSub.splice(inPlayerIdx, 1);
      currSub.lineup.push(inPlayer[0])
    }
    const outPlayerIdx = currSub.lineup.findIndex(({ id }) => id === sub.outPlayerId)
    if (outPlayerIdx !== -1) {
      const outPlayer = currSub.lineup.splice(outPlayerIdx, 1);
      currSub.availableForSub.push(outPlayer[0])
    }
    this.subFormationPerMinute[sub.timeMin] = currSub
  }

  validateAllSubs() {
    this.substitutions.forEach((substitution, i) => {
      this.validateSubtitution(substitution, i);
    });
  }



  validateSubtitution(substitutionForCheck, index) {
    let errorMassage = '';

    const matchDuraiton = this.teamEventValidationService.getMatchDuraiton();

    console.log(matchDuraiton);

    if (substitutionForCheck.timeMin < 0) {
      errorMassage += 'Subtitution time invalid, ';
    }

    if (substitutionForCheck.timeMin === 0 || substitutionForCheck.timeMin > matchDuraiton) {
      errorMassage += 'Invalid match min, ';
    }
    console.log(this.substitutions, index)
    console.log(this.subFormationPerMinute)
    const prevSubFormation = index > 0 ? this.subFormationPerMinute[this.substitutions[index - 1].timeMin] : this.subFormationPerMinute[0]
    const inPlayerIdx = prevSubFormation.availableForSub.findIndex(({ id }) => id === substitutionForCheck.inPlayerId)
    const outPlayerIdx = prevSubFormation.lineup.findIndex(({ id }) => id === substitutionForCheck.outPlayerId)
    if (inPlayerIdx === -1 || outPlayerIdx === -1) {
      errorMassage =+ inPlayerIdx === -1? 'Invalid in, ' : 'Invalid out, ';
    }

    substitutionForCheck.errorMassage = errorMassage.substring(0, errorMassage.length - 2);
  }
}
