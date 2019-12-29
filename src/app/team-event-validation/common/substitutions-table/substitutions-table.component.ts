import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'substitutions-table',
  templateUrl: './substitutions-table.component.html',
  styleUrls: ['./substitutions-table.component.scss']
})
export class SubstitutionsTableComponent implements OnInit {

  tableSizeConfig = {
    Minute: '9%',
    In: '14%',
    Out: '14%',
    Position: '39%',
    buttons: '9%'
  }

  substitutions = [
    { Minute: '1׳', In: 'Q. Thompson', Out: 'T.Best', Position: 'ST', type: '', id: '' },
    { Minute: '2׳', In: 'Q. Thompson', Out: 'T.Best', Position: 'ST', type: '' },
    { Minute: '3׳', In: 'Q. Thompson', Out: 'T.Best', Position: 'ST', type: '' },
    { Minute: '4׳', In: 'Q. Thompson', Out: 'T.Best', Position: 'ST', type: '' },
    { Minute: '5׳', In: 'Q. Thompson', Out: 'T.Best', Position: 'ST', type: '' }
    // { id: <long>, inPlayerId: <long>, outPlayerId: <long>, timeMin: <int>}
  ]

  emptySubstitution = { Minute: '', In: '', Out: '', Position: '', type: '', id: '' };

  Object = Object;

  constructor() { }

  ngOnInit() {
  }

  removeRow(substitutionToRemove, substitutionIdx) {
  //  const substitutionIdx = this.substitutions.findIndex(substitution => substitution.id === substitutionToRemove.id);
   this.substitutions.splice(substitutionIdx,1);
  //  console.log(this.substitutions);
  }

  addRow(substitutionToAdd) {
    this.substitutions.push(substitutionToAdd);
    // console.log(this.substitutions);
  }

  editRow(substitutionToEdit, substitutionIdx?) {
    if (!substitutionToEdit) { return };
  //  const substitutionIdx = this.substitutions.findIndex(substitution => substitution.id === substitutionToRemove.id);
    if (substitutionIdx) {
      this.substitutions[substitutionIdx] = substitutionToEdit;
    } else { // if idx not exist in substitutions -> add as new substitution *(for new rows)*
      this.addRow(substitutionToEdit);
    }
  }

}
