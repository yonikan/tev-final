import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamEventValidationService } from 'src/app/team-event-validation/team-event-validation.service';

@Component({
  selector: 'lineup-dropdown-row',
  templateUrl: './lineup-dropdown-row.component.html',
  styleUrls: ['./lineup-dropdown-row.component.scss']
})
export class LineupDropdownRowComponent implements OnInit {

  @Input() player: any = {};
  @Input() rowMode = 'OPPOESED'; //OPPOSEED_LINEUP
  @Input() selectedTeam: number;
  @Input() disable: any = false;
  @Input() phase;

  @Output() lineupRowClicked = new EventEmitter();

  constructor(private service: TeamEventValidationService) { }

  ngOnInit() {
    console.log('row: ', this.selectedTeam);
    this.disable = this.isDisabeled();
  }

  toggleSelectRow(team) {
    if (this.selectedTeam === 0) {
      this.selectedTeam = null;
      this.emit(this.selectedTeam);
    } else {
      this.emit(team)
      this.selectedTeam = team
    }
  }

  selectRow(event: MouseEvent, team: number) {
    if (team === this.selectedTeam) { return };
    event.stopPropagation();
    this.emit(team);
    this.selectedTeam = team;
  }

  emit(team) {
    this.lineupRowClicked.emit({ player: this.player, rowMode: this.rowMode, team, prevTeam: this.selectedTeam });
  }


  isDisabeled() {
    // console.log('isPlayerPartitpateInOverlapPhase: ', this.service.isPlayerPartitpateInOverlapPhase(this.player.playerId, this.phase))
    return this.service.isPlayerPartitpateInOverlapPhase(this.player.playerId, this.phase);
  }
}
