import { Component, OnInit } from '@angular/core';
import FormationService from './formation.service';

const players = [
  {id: 1, name: 'John A.'},
  {id: 2, name: 'John A.'},
  {id: 3, name: 'John A.'},
  {id: 4, name: 'John A.'},
  {id: 5, name: 'John A.'},
  {id: 6, name: 'John A.'},
  {id: 7, name: 'John A.'},
];


@Component({
  selector: 'app-step-match-formations',
  templateUrl: './step-match-formations.component.html',
  styleUrls: ['./step-match-formations.component.scss']
})
export class StepMatchFormationsComponent implements OnInit {
    playersData = [
        {id: 1, name: 'Goalkeepers', players, label: 'GK'},
        {id: 2, name: 'Defenders', players, label: 'DF'},
        {id: 3, name: 'Midfielders', players, label: 'MF'},
        {id: 4, name: 'Forwards', players, label: 'FR'},
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
        console.log('id', tacticFormation);
        this.selectedFormation = tacticFormation;
    }

    selectDefinedSub(id) {
        console.log('selectDefinedSub', id);
    }

}
