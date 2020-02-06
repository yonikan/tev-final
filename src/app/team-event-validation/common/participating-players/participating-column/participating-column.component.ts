import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, Output, EventEmitter } from '@angular/core';
import moment from "moment-timezone";

@Component({
  selector: 'app-participating-column',
  templateUrl: './participating-column.component.html',
  styleUrls: ['./participating-column.component.scss']
})
export class ParticipatingColumnComponent implements OnInit, OnChanges {
	@Input() players = [];
	@Input() actionName = '';
	@Input() isResetAllowed = false;
	@Input() isSwapAllowed = false;
	@Output() excludePlayer = new EventEmitter();
	@Output() swapPlayer = new EventEmitter();
	@Output() resetChanges = new EventEmitter();
	@Output() openSummaryPanel = new EventEmitter();

	participatingPlayers = [];
	currentPlayer = null;
	ACTION_NAMES = {
		EXCLUDE: 'Exclude',
		INCLUDE: 'Include'
	}
	HEADLINE = {
		[this.ACTION_NAMES.EXCLUDE]: "Included",
		[this.ACTION_NAMES.INCLUDE]: "Not Included",
	}

	constructor() { }

	ngOnInit() {
	}

	ngOnChanges() {
		this.participatingPlayers = this.players.filter(player =>
			(this.actionName === this.ACTION_NAMES.EXCLUDE) ? player.isParticipated : !player.isParticipated
		);
	}

	preventDetailsOpen(e) {
		e.preventDefault();
	}

	openSummary(player, el: HTMLElement) {
		this.players = this.players.map(p => {
			if (p.id !== player.id)
				p.isOpen = false;
			return p;
		});

		player.isOpen = !player.isOpen;
		this.currentPlayer = player.isOpen ? player : null;
		this.openSummaryPanel.emit({el, player, isIncluded: this.actionName === this.ACTION_NAMES.EXCLUDE});
	}

	exclude(player) {
		this.excludePlayer.emit(player);
	}

	onResetChanges() {
		this.resetChanges.emit();
	}

	getTimeDiff(startTime, endTime) {
		return moment(startTime).diff(moment(endTime), "minutes");
	}

	getTime(timestamp) {
		const d = new Date(timestamp);
		return `${(`${d.getHours()}`).padStart(2, '0')}:${(`${d.getMinutes()}`).padStart(2, '0')}`
	}

	trackByFn(i, item) {
		return item.id;
	}
}
