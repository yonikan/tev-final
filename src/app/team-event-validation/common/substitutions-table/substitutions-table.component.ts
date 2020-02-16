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

  linup;
  availableForSub;

  emptySubstitution = { timeMin: '', inPlayerId: '', outPlayerId: '', defaultPositionId: '', type: '', id: '' };

  participationgPlayers

  Object = Object;

  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {
    this.participationgPlayers = Object.values(this.teamEventValidationService.getAllParticipatingPlayers());
    this.linup = this.teamEventValidationService.getPlayersByIds(this.teamEventValidationService.linup, 'id');
    this.availableForSub = objToArray(this.teamEventValidationService.availableForSub, 'id');
    console.log(this.participationgPlayers, this.linup, this.availableForSub);
    //  console.log('SubstitutionsTableComponent: ',this.linup, this.availableForSub);
  }

  ngOnChanges(change) {
    if (this.substitutions && change.substitutions) {
      this.sortSubstitutions();
      // console.log('substitutions: ',this.substitutions);
    }
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
    if (substitutionIndex || substitutionIndex === 0) {
      this.substitutions[substitutionIndex] = substitutionToEdit;
    } else { // if Index not exist in substitutions -> add as new substitution *(for new rows)*
      this.addRow(substitutionToEdit);
    }
  }

  sendToTeamEvent(data) {
    this.subsEmitter.emit(data);
  }
}
