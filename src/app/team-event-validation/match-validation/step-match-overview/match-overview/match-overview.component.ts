import { Component, OnInit, Input } from '@angular/core';
import { StaffRoles } from '../../../../core/enums/staff-roles.enum';
import * as moment from 'moment';

@Component({
  selector: 'app-match-overview',
  templateUrl: './match-overview.component.html',
  styleUrls: ['./match-overview.component.scss']
})
export class MatchOverviewComponent implements OnInit {

  @Input() stepMatchOverviewData: any;

  competitionOptions = ['National league', ' National cup', 'TOTO cup'];

  // selectedCompetition;
  dataManager = {
    selectedCompetition: null,
    selecedHost: null,
    selectedScore: null,
    selectedOpponentScore: null,
    selectedOpponent: null
  }

  moment = moment;

  constructor() { }

  ngOnInit() {
    // console.log(this.stepMatchOverviewData);
  }

  populateData(value, keyToUpdate) {
    this.stepMatchOverviewData[keyToUpdate] = value;
  }

  setGameData(value, dataManagerKey, stepDataKey) {
    this.dataManager[dataManagerKey] = value;
    this.populateData(value, stepDataKey);
    console.log(this.stepMatchOverviewData);
  }

  updateScore(score = 0, side) {
    if (score < 0 || score > 99) { score = 0 };
    if (side === 'HOME') { this.setGameData(+score,'selectedScore' ,'myScore') };
    if (side === 'AWAY') { this.setGameData(+score,'selectedOpponentScore' ,'opponentScore') };
  }

}
