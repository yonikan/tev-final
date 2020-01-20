import { Component, OnInit, Input } from '@angular/core';
import { StaffRoles } from '../../../../core/enums/staff-roles.enum';

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
    selectedOpponent: null
  }

  constructor() { }

  ngOnInit() {
    // console.log(this.stepMatchOverviewData);
  }

  populateData(value, keyToUpdate) {
    this.stepMatchOverviewData[keyToUpdate] = value;
    // console.log(this.stepMatchOverviewData);
  }

  setGameData(value, dataManagerKey, stepDataKey) {
    // console.log(value)
    this.dataManager[dataManagerKey] = value;
    this.populateData(value, stepDataKey);
    console.log(this.stepMatchOverviewData);
  }

  updateScore(score = 0, side) {
    if (score < 0 || score > 99) { score = 0 };
      if (side === 'HOME') { this.populateData(+score, 'myScore') };
    if (side === 'AWAY') { this.populateData(+score, 'opponentScore') };
  }

}
