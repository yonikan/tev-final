import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamEventValidationService } from 'src/app/team-event-validation/team-event-validation.service';
import { objToArray } from '../../../../core/helpers/helper-functions';

@Component({
  selector: 'substitutions-row',
  templateUrl: './substitutions-row.component.html',
  styleUrls: ['./substitutions-row.component.scss']
})
export class SubstitutionsRowComponent implements OnInit {

  @Input() substitution;
  @Input() participationgPlayers;
  @Input() rowConfig;
  @Input() rowStyle;
  @Input() rowMode = 'GENERAL';
  @Input() availableForSub;
  @Input() linup;

  @Output() removeRow = new EventEmitter();
  @Output() addRow = new EventEmitter();
  @Output() editRow = new EventEmitter();

  // substitutionDraft;

  Object = Object;
  substitutionForDisplay;
  positions = ['ST', 'CF', 'CAM', 'LW', 'RW', 'CB']

  objToArray = objToArray;

  minTimeForSub = 0;

  errorsManager = {
    Minute: {showError: false, errorMassage: 'Invalid match min'}
  }

  constructor(private service: TeamEventValidationService) {
  }

  ngOnInit() {
    // console.log(`${this.rowMode}: `,this.substitution)
    // console.log(this.availableForSub, this.linup)
    // this.substitutionDraft = { ...this.substitution };
    this.setSubForDisplay();
  }

  // ngOnChanges(change) {
  //   if (this.substitutionForDisplay && change.substitutionForDisplay) {
  //     this.setSubForDisplay()
  //   }
  // }

  setSubForDisplay() {
    const inPlayer = this.service.getPlayerById(this.substitution['inPlayerId']);
    const outPlayer = this.service.getPlayerById(this.substitution['outPlayerId']);
    this.substitutionForDisplay = {
      Minute: this.substitution['timeMin'] || '',
      In: `${inPlayer.firstName || ''} ${inPlayer.lastName || ''}`,
      Out: `${outPlayer.firstName || ''} ${outPlayer.firstName || ''}`,
      Position: this.substitution['defaultPositionId'] || '',
    }
    // console.log({substitutionForDisplay: this.substitutionForDisplay, inPlayer, outPlayer})
  }

  showPlayerNameByFormat(playerName) { //should be general comp
    if (!playerName) { return };
    // if(this.rowMode === 'EDIT') console.log(playerName)
    // console.log(`playerName: ${playerName}`,playerName.split(' '), this.substitutionForDisplay, )
    let nameByFormat = playerName.split(' ');
    if (!nameByFormat[0] || !nameByFormat[1]) { return };
    nameByFormat = `${nameByFormat[0][0].toUpperCase()}.${nameByFormat[1].toLowerCase()}`;
    return nameByFormat;
  }

  addRowEmit() {
    if (this.validateRow()) {
      this.addRow.emit({ substitution: this.substitution, rowMode: this.rowMode });
      if (this.rowMode === 'EDIT') { this.changeRowMode('GENERAL'); }
      this.resetSubstitution();
      console.log('addRowEmit: ', this.substitution);
    }
  }

  removeRowEmit() {
    this.removeRow.emit({ substitution: this.substitution, rowMode: this.rowMode });
    console.log('removeRowEmit');
  }

  editRowEmit() {
    if (this.validateRow()) {
      this.editRow.emit({ substitution: this.substitution, rowMode: this.rowMode });
      this.changeRowMode('GENERAL');
    }
  }

  changeRowMode(newMode) {
    if (this.rowMode === 'NEW') { return };
    this.rowMode = newMode;
  }

  populateCell(value, cell, event, valueIsNum = false) {
    if (valueIsNum) { value = +value };
    const map = { Minute: 'timeMin', In: 'inPlayerId', Out: 'outPlayerId', Position: 'defaultPositionId' };
    // if(cell === 'In' || cell === 'Out') {
    //   let player = value.split(' ');
    //   player = {firstName:player[0], lastName: player[1]};
    //   this.substitution[map[cell]] = player;
    // } else {  }
    this.substitution[map[cell]] = value;
    // this.substitutionForDisplay[cell] = value;
    if (cell === 'Minute') {
      if (value > this.minTimeForSub) { this.minTimeForSub = value };
      (value > 125 || value <= 0 || !Number.isInteger(value))?  this.errorsManager.Minute.showError = true : this.errorsManager.Minute.showError = false;
    }
    this.setSubForDisplay();
    // this.stopPropagation(event);
    // console.log({value, cell, substitution: this.substitution, event, substitutionForDisplay: this.substitutionForDisplay});
  }

  stopPropagation(event) {
    event.stopPropagation();
    // event.preventdefault();
  }

  validateRow() {
    const keysToDisclude = ['id', 'type'];

    for (const key in this.substitution) {
      if (this.substitution.hasOwnProperty(key)) {
        if (!this.substitution[key] && !keysToDisclude.includes(key)) { return false };
      }
    }

    if (this.substitution.timeMin < this.minTimeForSub) { return false };
    this.minTimeForSub = this.substitution.timeMin;

    return true;
  }

  resetSubstitution() {
    // const substitutionsTypesToReset = ['substitution','substitutionForDisplay'];

    // substitutionsTypesToReset.forEach((substitutionType)=>{
    //   for (const key in this[substitutionType]) {
    //     if (this[substitutionType].hasOwnProperty(key)) {
    //       this[substitutionType][key] = '';
    //     }
    //   };
    // });
    this.substitution = {
      id: '',
      inPlayerId: '',
      outPlayerId: '',
      timeMin: ''
    };

    this.substitutionForDisplay = {
      Minute: '',
      In: '',
      Out: '',
      Position: '',
    }
  };

  print(args) {
    console.log(args);
  }

}
