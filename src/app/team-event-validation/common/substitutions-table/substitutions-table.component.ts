import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';
import { objToArray, sortFunction } from '../../../core/helpers/helper-functions';

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
  linup;
  availableForSub;

  emptySubstitution = { timeMin: '', inPlayerId: '', outPlayerId: '', defaultPositionId: '', type: '', id: '' };

  participationgPlayers

  Object = Object;

  constructor(private service: TeamEventValidationService) { }

  ngOnInit() {
    this.participationgPlayers = Object.values(this.service.getAllParticipatingPlayers());
    this.linup = this.service.getPlayersByIds(this.service.linup, 'playerId');
    this.availableForSub = objToArray(this.service.availableForSub, 'playerId');
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
}
