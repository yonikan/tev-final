import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-physical-modal',
  templateUrl: './physical-modal.component.html',
  styleUrls: ['./physical-modal.component.scss']
})
export class PhysicalModalComponent implements OnInit {

   drillTypes = [
   {name: 'Oppoesed', icon: 'account_circle'},
   {name: 'Opposeed Lineup', icon: 'account_circle'},
   {name: 'Unoppsed', icon: 'account_circle'},
   {name: 'Unopposed Passing', icon: 'account_circle'}
  ]

  selectedDrill;

  constructor() { }

  ngOnInit() {
  }

  onDrillSelect(event) {
    this.selectedDrill = event.value;
    console.log(event);
  }

}
