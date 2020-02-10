import { Component, OnInit, ViewChild, ViewChildren, Input, Output, EventEmitter } from '@angular/core';
import { LineupDropdownRowComponent } from './lineup-dropdown-row/lineup-dropdown-row.component';
import { TeamEventValidationService } from 'src/app/team-event-validation/team-event-validation.service';
import { objToArray } from '../../../../core/helpers/helper-functions';
@Component({
  selector: 'app-technical-modal',
  templateUrl: './technical-modal.component.html',
  styleUrls: ['./technical-modal.component.scss']
})
export class TechnicalModalComponent implements OnInit {

  @Input() phase;
  @Input() selectedLineup = {};
  @Output() pitchSizeSelected = new EventEmitter();
  @Output() updateField = new EventEmitter();
  @ViewChildren(LineupDropdownRowComponent) lineupDropdownRows: LineupDropdownRowComponent[];

  lineup = [];
  lineupTitle;
  selectedDrill;

  Object = Object;

  drillTypes = [
    { name: 'Oppoesed', icon: 'account_circle', enum: 'OPPOESED', subType: 1, subTypeAnalysis: 2 },
    { name: 'Opposeed Lineup', icon: 'account_circle', enum: 'OPPOSEED_LINEUP', subType: 1, subTypeAnalysis: 1 },
    { name: 'Unopposed', icon: 'account_circle', enum: 'UNOPPOESED', subType: 2, subTypeAnalysis: 2 },
    { name: 'Unopposed Passing', icon: 'account_circle', enum: 'UNOPPOESED_PASSING', subType: 2, subTypeAnalysis: 1 }
  ];

  pitchSizeOptions = [
    { name: 'All Field', iconName: 'account_circle', type: 'GENERAL', pitchLength: 1, pitchWidth: 1 },
    { name: 'Half Filed', iconName: 'account_circle', type: 'GENERAL', pitchLength: 1, pitchWidth: 2 },
    { name: '3/4', iconName: 'account_circle', type: 'GENERAL', pitchLength: 3, pitchWidth: 4 },
    { name: '2/3', iconName: 'account_circle', type: 'GENERAL', pitchLength: 2, pitchWidth: 3 },
    { name: '1/3', iconName: 'account_circle', type: 'GENERAL', pitchLength: 1, pitchWidth: 3 },
  ];

  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {
    this.setSelectedLineup();

    this.selectedDrill = this.drillTypes.find((drillType) => {
      return (drillType.subType === this.phase.subType && drillType.subTypeAnalysis === this.phase.subTypeAnalysis)
    });

    this.lineup = objToArray(this.teamEventValidationService.getAllParticipatingPlayers(), 'id');
    this.setLineupTitle();
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

  onDrillSelect({ value }) {
    if (this.selectedDrill.enum !== value.enum) {
      this.selectedDrill = value;
      this.updateField.emit({ value: value.subType, filedPathToUpdate: ['subType'] });
      this.updateField.emit({ value: value.subTypeAnalysis, filedPathToUpdate: ['subTypeAnalysis'] });

      this.lineupTitle = null;
      for (const team in this.selectedLineup) {
        if (this.selectedLineup.hasOwnProperty(team)) {
          this.selectedLineup[team] = [];
        }
      }
    }
  }

  onPitchSizeSelect(pitchSizeOption) {
    const selectedPitchSize = pitchSizeOption;
    if (selectedPitchSize) {
      this.updateField.emit({ value: selectedPitchSize.pitchWidth, filedPathToUpdate: ['pitchWidth'] });
      this.updateField.emit({ value: pitchSizeOption.pitchLength, filedPathToUpdate: ['pitchLength'] });
    }

  }

  onLineupRowClicked(rowData) {
    if (rowData.rowMode !== 'OPPOSEED_LINEUP') {
      if (!rowData.remove) {
        this.selectedLineup[1].push(+rowData.player.id);
      } else {
        const indexToDelete = this.selectedLineup[1].findIndex(playerId => +rowData.player.id === playerId);
        this.selectedLineup[1].splice(indexToDelete, 1);
      }
    }

    if (rowData.rowMode === 'OPPOSEED_LINEUP') {
      this.selectedLineup[rowData.team].push(+rowData.player.id);
      if (rowData.prevTeam || rowData.prevTeam === 0) {
        console.log(this.selectedLineup,rowData);
        const indexToDelete = this.selectedLineup[rowData.prevTeam].findIndex(playerId => +rowData.player.id === playerId);
        this.selectedLineup[rowData.prevTeam].splice(indexToDelete, 1);
      };
    }

    this.setLineupTitle();
    console.log(rowData, this.selectedLineup);
  }

  setLineupTitle() {
    switch (this.selectedDrill.enum) {
      case 'OPPOESED':
        this.lineupTitle = this.selectedLineup[1].length;
        break;

      case 'OPPOSEED_LINEUP':
        this.lineupTitle = `${this.selectedLineup[1].length}V${this.selectedLineup[2].length}`;
        if (this.selectedLineup[0].length) { this.lineupTitle += `+${this.selectedLineup[0].length}` };
        break;

      default:
        this.lineupTitle = this.selectedLineup[1].length;
        break;
    }
  }

  selectAllLineups(event) {
    if (this.selectedLineup[1].length === this.lineup.length) {
      this.lineupDropdownRows.forEach(row => {
        row.unSelectRow();
      });
    } else {
      this.lineupDropdownRows.forEach(row => {
        row.selectRow(1);
      });
    }
  }

  getPositionsLineupObj() {
    return this.lineup.reduce((acc = {}, player) => {
      const positionName = this.teamEventValidationService.getPositionById(player.defaultPositionId);
      if (!acc.hasOwnProperty(positionName)) { acc[positionName] = [] };
      acc[positionName].push(player);
      return acc;
    }, {});
  }

  changePhaseName(value) {
    this.updateField.emit({ value, filedPathToUpdate: ['phaseName'] });
  }

}
