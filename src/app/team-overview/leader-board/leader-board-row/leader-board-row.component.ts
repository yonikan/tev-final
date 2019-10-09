import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-leader-board-row',
  templateUrl: './leader-board-row.component.html',
  styleUrls: ['./leader-board-row.component.scss']
})
export class LeaderBoardRowComponent implements OnInit {
  @Input() itemData: any; 
  @Input() itemIndex: any[]; 

  constructor() { }

  ngOnInit() {
  }
}
