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
  @Input() selected = false;
  @Input() disable: any = false;
  @Input() phase;

  @Output() lineupRowClicked = new EventEmitter();

  selectedTeam;

  constructor(private service: TeamEventValidationService) { }

  ngOnInit() {
    this.disable = this.isDisabeled();
  }

  onLineupRowClicked(team?) {
    if (this.rowMode === 'OPPOSEED_LINEUP' && !team) { return };
    this.selected = !this.selected;
    this.emit(team);
    if (team) { this.selectedTeam = team };
  }

  selectRow(team?) {
    if (this.selected) { return };
    this.selected = true;
    this.emit(team);
  }

  unSelectRow(team?) {
    if (!this.selected) { return };
    this.selected = false;
    this.emit(team);
  }

  emit(team?) {
    this.lineupRowClicked.emit({ selected: this.selected, player: this.player, rowMode: this.rowMode, team, prevTeam: this.selectedTeam });
  }

  toggleSelected() {
    this.selected = !this.selected;
  }

  isDisabeled() {
    // return this.service.isPlayerPartitpateInOverlapPhase(this.player.playerId, this.phase);
  }
}
