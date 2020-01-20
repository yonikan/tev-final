import { Component, OnInit, ViewChild, ViewChildren, Input } from '@angular/core';
import { LineupDropdownRowComponent } from './lineup-dropdown-row/lineup-dropdown-row.component';
import { TeamEventValidationService } from 'src/app/team-event-validation/team-event-validation.service';
@Component({
  selector: 'app-technical-modal',
  templateUrl: './technical-modal.component.html',
  styleUrls: ['./technical-modal.component.scss']
})
export class TechnicalModalComponent implements OnInit {

  @ViewChildren(LineupDropdownRowComponent) lineupDropdownRows: LineupDropdownRowComponent[];

  drillTypes = [
    { name: 'Oppoesed', icon: 'account_circle', enum: 'OPPOESED' },
    { name: 'Opposeed Lineup', icon: 'account_circle', enum: 'OPPOSEED_LINEUP' },
    { name: 'Unopposed', icon: 'account_circle', enum: 'UNOPPOESED' },
    { name: 'Unopposed Passing', icon: 'account_circle', enum: 'UNOPPOESED_PASSING' }
  ];

  selectedDrill;
  selectedPitchSize;
  selectedLineup = { 1: [], 2: [], 3: [] };

  pitchSizeOptions = [
    { name: 'All Field', iconName: 'account_circle', type: 'GENERAL', size: '1/1' },
    { name: 'Half Filed', iconName: 'account_circle', type: 'GENERAL', size: '1/2' },
    { name: '3/4', iconName: 'account_circle', type: 'GENERAL', size: '3/4' },
    { name: '2/3', iconName: 'account_circle', type: 'GENERAL', size: '2/3' },
    { name: '1/3', iconName: 'account_circle', type: 'GENERAL', size: '1/3' },
  ];

  lineup = [
    {
      name: 'Albert Lawrence',
      imageSrc: 'https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg',
      defaultPositionId: '1',
      playerId: '111'
    },
    {
      name: 'Albert Lawrence',
      imageSrc: 'https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg',
      defaultPositionId: '2',
      playerId: '222'

    }, {
      name: 'Albert Lawrence',
      imageSrc: 'https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg',
      defaultPositionId: '2',
      playerId: '333'

    }
  ];

  lineupTitle;
  Object = Object;

  @Input() phase;

  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {
    this.selectedDrill = this.drillTypes[0];
    this.selectedPitchSize = this.pitchSizeOptions[0];
  }

  onDrillSelect(event) {
    if (this.selectedDrill !== event.value) {
      this.selectedDrill = event.value;
      this.lineupTitle = null;
      for (const team in this.selectedLineup) {
        if (this.selectedLineup.hasOwnProperty(team)) {
          this.selectedLineup[team] = [];
        }
      }
    }
    console.log(event);
  }

  onPitchSizeSelect(event) {
    if (this.selectedPitchSize.size === event.size) { return }
    this.selectedPitchSize = event;
    console.log(this.selectedPitchSize);
  }

  onLineupRowClicked(rowData) {
    if (rowData.rowMode === 'OPPOESED') {
      if (rowData.selected) {
        this.selectedLineup['1'].push(rowData.player.playerId);
        this.lineupTitle ? this.lineupTitle++ : this.lineupTitle = 1;
      } else {
        const idxToDelete = this.selectedLineup['1'].findIndex(playerId => rowData.player.playerId === playerId);
        this.selectedLineup['1'].splice(idxToDelete, 1);
        this.lineupTitle--;
      }
    }

    if (rowData.rowMode === 'OPPOSEED_LINEUP') {
      this.selectedLineup[rowData.team].push(rowData.player.playerId);
      if (rowData.prevTeam) {
        const idxToDelete = this.selectedLineup[rowData.prevTeam].findIndex(playerId => rowData.player.playerId === playerId);
        this.selectedLineup[rowData.prevTeam].splice(idxToDelete, 1);
      };
      this.lineupTitle = `${this.selectedLineup[1].length}V${this.selectedLineup[3].length}`;
      if(this.selectedLineup[2].length) {this.lineupTitle += `+${this.selectedLineup[2].length}`};
    }

    // console.log(rowData, this.selectedLineup);
  }

  selectAllLineups() {
    this.lineupDropdownRows.forEach(row => {
      row.selectRow();
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

}
