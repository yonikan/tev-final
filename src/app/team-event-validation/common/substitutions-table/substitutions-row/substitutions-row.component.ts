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
  @Input() rowConfig;
  @Input() rowStyle;
  @Input() rowMode = 'GENERAL';
  @Input() availableForSub;
  @Input() lineup;

  @Output() removeRow = new EventEmitter();
  @Output() addRow = new EventEmitter();
  @Output() editRow = new EventEmitter();
  @Output() setSubsList = new EventEmitter();

  substitutionDraft;

  Object = Object;
  substitutionForDisplay;
  positions;
  objToArray = objToArray;
  minTimeForSub = 0;
  errorsManager = {
    showError: false, errorMassage: ''
  }

  constructor(private teamEventValidationService: TeamEventValidationService) {
  }

  ngOnInit() {
    this.substitutionDraft = { ...this.substitution };
    this.setSubForDisplay();
    this.positions = this.teamEventValidationService.getStaticPositionsList();
  }

  setSubForDisplay() {
    const inPlayer = this.teamEventValidationService.getPlayerById(this.substitutionDraft['inPlayerId']);
    const outPlayer = this.teamEventValidationService.getPlayerById(this.substitutionDraft['outPlayerId']);
    this.substitutionForDisplay = {
      Minute: this.substitutionDraft['timeMin'] || '',
      In: `${inPlayer.firstName || ''} ${inPlayer.lastName || ''}`,
      Out: `${outPlayer.firstName || ''} ${outPlayer.lastName || ''}`,
      Position:this.substitutionDraft['positionId']? this.teamEventValidationService.getPlayerPositionName(this.substitutionDraft['positionId'], 'shortName') : (inPlayer.defaultPositionId && this.teamEventValidationService.getPlayerPositionName(inPlayer.defaultPositionId, 'shortName')) || '',
    }
  }

  showPlayerNameByFormat(playerName) {
    if (!playerName) { return };
    let nameByFormat = playerName.split(' ');
    if (!nameByFormat[0] || !nameByFormat[1]) { return };
    nameByFormat = `${nameByFormat[0][0].toUpperCase()}.${nameByFormat[1].toLowerCase()}`;
    return nameByFormat;
  }

  addRowEmit() {
      this.addRow.emit({ substitution: this.substitutionDraft, rowMode: this.rowMode });
      if (this.rowMode === 'EDIT') { this.changeRowMode('GENERAL'); }
      if (this.rowMode === 'NEW') { this.resetSubstitution(); }
  }

  setSubsListEmit() {
    this.setSubsList.emit({substitution: this.substitutionDraft});
  }

  removeRowEmit() {
    this.removeRow.emit({ substitution: this.substitutionDraft, rowMode: this.rowMode });
  }

  editRowEmit() {
      this.editRow.emit({ substitution: this.substitutionDraft, rowMode: this.rowMode });
      this.changeRowMode('GENERAL');
  }

  changeRowMode(newMode) {
    if (this.rowMode === 'NEW') { return };
    this.rowMode = newMode;
  }

  populateCell(value, cell, event, valueIsNum = false) {
    if (valueIsNum) { value = +value };
    const map = { Minute: 'timeMin', In: 'inPlayerId', Out: 'outPlayerId', Position: 'positionId' };

    this.substitutionDraft[map[cell]] = value;

    if (cell === 'Minute') {
      if (value > this.minTimeForSub) { this.minTimeForSub = value };
      (value > 125 || value <= 0 || !Number.isInteger(value)) ? this.errorsManager.showError = true : this.errorsManager.showError = false;
    }
    this.setSubForDisplay();
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  resetSubstitution() {
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

}
