import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-formation-field',
  templateUrl: './formation-field.component.html',
  styleUrls: ['./formation-field.component.scss']
})
export class FormationFieldComponent implements OnInit {
  @Input() formation;

  constructor() {}

  ngOnInit() {
  }

}
