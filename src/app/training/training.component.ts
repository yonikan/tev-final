import { Component, OnInit } from '@angular/core';
import { fadeInUpAnimation } from '../core/animations/fade-in-up.animation';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  animations: [fadeInUpAnimation]
})
export class TrainingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
