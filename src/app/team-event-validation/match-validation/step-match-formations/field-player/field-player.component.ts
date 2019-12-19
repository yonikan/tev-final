import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-player',
  templateUrl: './field-player.component.html',
  styleUrls: ['./field-player.component.scss']
})
export class FieldPlayerComponent implements OnInit {
  @Input() positionName;
  @Input() playerName;

  constructor() { }

  ngOnInit() {
  }

}
