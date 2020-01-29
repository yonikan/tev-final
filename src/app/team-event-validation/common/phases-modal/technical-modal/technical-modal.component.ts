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
    { name: 'Oppoesed', icon: 'account_circle', enum: 'OPPOESED' },
    { name: 'Opposeed Lineup', icon: 'account_circle', enum: 'OPPOSEED_LINEUP' },
    { name: 'Unopposed', icon: 'account_circle', enum: 'UNOPPOESED' },
    { name: 'Unopposed Passing', icon: 'account_circle', enum: 'UNOPPOESED_PASSING' }
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
    console.log('selectedLineup: ', this.selectedLineup)

    this.selectedDrill = this.drillTypes[0];

    this.lineup = objToArray(this.teamEventValidationService.getAllParticipatingPlayers(), 'id');
    this.setLineupTitle();
  }

  isSelected(id) {
    // id = +id;
    let res: any = 'not found';
    Object.keys(this.selectedLineup).forEach((teamId) => {
      if (this.selectedLineup[+teamId].includes(+id)) { res = +teamId; };
    });
    return res;
  }

  onDrillSelect(event) {
    if (this.selectedDrill !== event.value) {
      this.selectedDrill = event.value;
      this.lineupTitle = null;
      // this.setLineupTitle();
      for (const team in this.selectedLineup) {
        if (this.selectedLineup.hasOwnProperty(team)) {
          this.selectedLineup[team] = [];
        }
      }
    }
  }

  onPitchSizeSelect(optionName) {
    const selectedPitchSize = this.pitchSizeOptions.find(({ name }) => { return name === optionName });
    if (selectedPitchSize) {
      this.pitchSizeSelected.emit(selectedPitchSize);
    }

  }

  onLineupRowClicked(rowData) {
    if (rowData.rowMode === 'OPPOESED') {
      if (rowData.team === 0) {
        this.selectedLineup[0].push(rowData.player.playerId);
      } else {
        const idxToDelete = this.selectedLineup[0].findIndex(playerId => rowData.player.playerId === playerId);
        this.selectedLineup[0].splice(idxToDelete, 1);
      }
    }

    if (rowData.rowMode === 'OPPOSEED_LINEUP') {
      this.selectedLineup[rowData.team].push(rowData.player.playerId);
      if (rowData.prevTeam) {
        console.log(this.selectedLineup[rowData.prevTeam]);
        const idxToDelete = this.selectedLineup[rowData.prevTeam].findIndex(playerId => rowData.player.playerId === playerId);
        this.selectedLineup[rowData.prevTeam].splice(idxToDelete, 1);
      };
    }

    this.setLineupTitle();
    console.log(rowData, this.selectedLineup);
  }

  setLineupTitle() {
    switch (this.selectedDrill.enum) {
      case 'OPPOESED':
        this.lineupTitle = this.selectedLineup[0].length;
        break;

      case 'OPPOSEED_LINEUP':
        this.lineupTitle = `${this.selectedLineup[1].length}V${this.selectedLineup[2].length}`;
        if (this.selectedLineup[2].length) { this.lineupTitle += `+${this.selectedLineup[1].length}` };
        break;
    }
  }

  selectAllLineups(event) {
    this.lineupDropdownRows.forEach(row => {
      row.selectRow(event, 0);
    });
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
    this.updateField.emit({value, filedPathToUpdate: ['phaseName']});
  }

}
