import { Component, OnInit } from '@angular/core';
import FormationService from './formation.service';

const players = [
  {id: 1, name: 'John A.', "positionName": "XX"},
  {id: 2, name: 'John B.', "positionName": "XX"},
  {id: 3, name: 'John C.', "positionName": "XX"},
  {id: 4, name: 'John A.', "positionName": "XY"},
  {id: 5, name: 'John B.', "positionName": "XY"},
  {id: 6, name: 'John A.', "positionName": "XZ"},
  {id: 7, name: 'John B.', "positionName": "XZ"},
];


@Component({
  selector: 'app-step-match-formations',
  templateUrl: './step-match-formations.component.html',
  styleUrls: ['./step-match-formations.component.scss']
})
export class StepMatchFormationsComponent implements OnInit {
    playersData = [
        {id: 1, name: 'Goalkeepers', players, positionName: 'GK'},
        {id: 2, name: 'Defenders', players, positionName: 'DF'},
        {id: 3, name: 'Midfielders', players, positionName: 'MF'},
        {id: 4, name: 'Forwards', players, positionName: 'FR'}
    ];

    tactics = null;

    definedSubs = [
        {id: 1, name: 'Match Minutes', isSelected: true},
        {id: 2, name: 'Phase Minutes', isSelected: false}
    ];

    selectedFormation = {};

    constructor(private formationService: FormationService) {
        this.tactics = formationService.getFormations();
    }


    ngOnInit() {
    }

    selectTactic(tacticFormation) {
        this.selectedFormation = tacticFormation;
    }

    selectDefinedSub(id) {
        // console.log('selectDefinedSub', id);
    }

}
