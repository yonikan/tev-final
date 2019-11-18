import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-team-picker',
  templateUrl: './team-picker.component.html',
  styleUrls: ['./team-picker.component.scss']
})
export class TeamPickerComponent implements OnInit {
  // @Output() selectedTeamEmitter = new EventEmitter<any>();
  // @Input() teamsList: any;
  // @Input() defaultTeam: any;
  
  // currentTeam = 'hull-u14';

  // constructor() { }

  // ngOnInit() {
  //   // console.log('teamsList: ', this.teamsList);
  // }

  // selectedTeam(team: string) {
  //   this.selectedTeamEmitter.emit(team);
  // }
}
