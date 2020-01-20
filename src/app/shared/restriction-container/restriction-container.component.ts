import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'restriction-container',
  templateUrl: './restriction-container.component.html',
  styleUrls: ['./restriction-container.component.scss']
})
export class RestrictionContainerComponent implements OnInit {

  @Input() showError;
  @Input() errorMassage;


  constructor() {
  }

  ngOnInit() {

  }

}
