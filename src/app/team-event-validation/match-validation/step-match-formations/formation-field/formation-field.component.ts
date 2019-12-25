import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-formation-field',
  templateUrl: './formation-field.component.html',
  styleUrls: ['./formation-field.component.scss']
})
export class FormationFieldComponent implements OnInit {
  @Input() formation;
  @Input() playersData;

  constructor() {
  }

  ngOnInit() {

  }

  getPositionX(formationPosition, i, positionX) {
    if (formationPosition[i+1] && (formationPosition[i+1].positionX === positionX + 1)) {
      if (formationPosition[i-1] && formationPosition[i-1].positionX !== (positionX + 1)) {
        return positionX;
      }

      return `${positionX - 1}`;
    } else if (formationPosition[i-1] && formationPosition[i-1].positionX === positionX - 1) {
      return `${positionX + 1}`
    }

    return positionX;
  }

}
