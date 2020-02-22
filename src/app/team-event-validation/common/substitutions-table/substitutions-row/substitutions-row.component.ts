import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamEventValidationService } from 'src/app/team-event-validation/team-event-validation.service';

@Component({
  selector: 'substitutions-row',
  templateUrl: './substitutions-row.component.html',
  styleUrls: ['./substitutions-row.component.scss']
})
export class SubstitutionsRowComponent implements OnInit {

  @Input() substitution; // Substitution
  @Input() rowConfig; // RowConfig
  @Input() rowStyle; // RowStyle
  @Input() rowMode: string = 'GENERAL';
  @Input() availableForSub; // Player[]
  @Input() lineup; // Player[]

  @Output() removeRow = new EventEmitter();
  @Output() addRow = new EventEmitter();
  @Output() editRow = new EventEmitter();
  @Output() setSubsList = new EventEmitter();

  substitutionDraft; // Substitution

  Object: ObjectConstructor = Object;
  substitutionForDisplay; // Substitution
  positions; // ?
  minTimeForSub: number | string = 0;
  errorsManager = {
    showError: false, errorMassage: ''
  }

  constructor(private teamEventValidationService: TeamEventValidationService) {
  }

  ngOnInit() {
    this.setSubId(this.substitution);
    this.setSubForDisplay();
    this.positions = this.teamEventValidationService.getStaticPositionsList();
  }

  setSubId(sub /* Substitution */): void {
    sub['subId'] = Date.now();
    this.substitutionDraft = { ...this.substitution };
  }

  setSubForDisplay(): void {
    const inPlayer = this.teamEventValidationService.getPlayerById(this.substitutionDraft['inPlayerId']);
    const outPlayer = this.teamEventValidationService.getPlayerById(this.substitutionDraft['outPlayerId']);
    this.substitutionForDisplay = {
      Minute: this.substitutionDraft['timeMin'] || '',
      In: `${inPlayer.firstName || ''} ${inPlayer.lastName || ''}`,
      Out: `${outPlayer.firstName || ''} ${outPlayer.lastName || ''}`,
      Position: this.substitutionDraft['positionId'] ? this.teamEventValidationService.getPlayerPositionName(this.substitutionDraft['positionId'], 'shortName') : (inPlayer.defaultPositionId && this.teamEventValidationService.getPlayerPositionName(inPlayer.defaultPositionId, 'shortName')) || '',
    }
  }

  showPlayerNameByFormat(playerName: string): void {
    if (!playerName) { return };
    let nameByFormat: any = playerName.split(' ');
    if (!nameByFormat[0] || !nameByFormat[1]) { return };
    nameByFormat = `${nameByFormat[0][0].toUpperCase()}.${nameByFormat[1].toLowerCase()}`;
    return nameByFormat;
  }

  addRowEmit(): void {
    this.addRow.emit({ substitution: this.substitutionDraft, rowMode: this.rowMode });
    if (this.rowMode === 'EDIT') { this.changeRowMode('GENERAL'); }
    if (this.rowMode === 'NEW') { this.resetSubstitution(); }
  }

  setSubsListEmit(): void {
    this.setSubsList.emit({ substitution: this.substitutionDraft });
  }

  removeRowEmit(): void {
    this.removeRow.emit({ substitution: this.substitutionDraft, rowMode: this.rowMode });
  }

  editRowEmit(): void {
    this.editRow.emit({ substitution: this.substitutionDraft, rowMode: this.rowMode });
    this.changeRowMode('GENERAL');
  }

  changeRowMode(newMode): void {
    if (this.rowMode === 'NEW') { return };
    this.rowMode = newMode;
  }

  populateCell(value: any, cell: string, valueIsNum: boolean = false): void {
    if (valueIsNum) { value = +value };
    const map = { Minute: 'timeMin', In: 'inPlayerId', Out: 'outPlayerId', Position: 'positionId' };

    this.substitutionDraft[map[cell]] = value;

    if (cell === 'Minute') {
      if (value > this.minTimeForSub) { this.minTimeForSub = value };
      (value > 125 || value <= 0 || !Number.isInteger(value)) ? this.errorsManager.showError = true : this.errorsManager.showError = false;
    }
    this.setSubForDisplay();
  }

  resetSubstitution(): void {
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
