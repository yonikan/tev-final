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
	@Input() clubPlayers = [];
	@Output() excludePlayer = new EventEmitter();
	@Output() swapPlayer = new EventEmitter();
	@Output() resetChanges = new EventEmitter();

	private clubPlayersGroup = [];
	private participatingPlayers = [];
	private currentPlayer = null;
	private ACTION_NAMES = {
		EXCLUDE: 'Exclude',
		INCLUDE: 'Include'
	}
	private HEADLINE = {
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
		this.clubPlayersGroup = this.getClubPlayers();
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
		this.scroll(el)
	}

	doSwapPlayer(player) {
		this.swapPlayer.emit({player, swappedPlayer: this.currentPlayer});
		this.currentPlayer = null;
	}

  	scroll(el: HTMLElement) {
		setTimeout(() => {
			el.scrollIntoView({behavior:"smooth", block: "nearest"});
		}, 500);
	}

	getClubPlayers() {
		const clubPlayersGroup = this.clubPlayers.reduce((acc, curr) => {
			if (!acc[curr.clubName]) acc[curr.clubName] = [];
			 acc[curr.clubName] = [...acc[curr.clubName], {...curr}];
			return acc;
		}, {});

		return Object
			.keys(clubPlayersGroup)
			.map((name, i) => {
				return {name, players: clubPlayersGroup[name]}
			});
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

}
