import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-participating-column',
  templateUrl: './participating-column.component.html',
  styleUrls: ['./participating-column.component.scss']
})
export class ParticipatingColumnComponent implements OnInit {
	@Input() players = [];
	@Input() actionName = '';

	constructor() { }

	ngOnInit() {
	}

	preventDetailsOpen(e) {
		e.preventDefault();
	}

	openSummary() {

	}

  	scroll(player, el: HTMLElement) {
		this.players = this.players.map(p => {
			if (p.id !== player.id)
				p.isOpen = false;
			return p;
		});

		player.isOpen = !player.isOpen;
		setTimeout(() => {
			el.scrollIntoView({behavior:"smooth", block: "nearest"});
		});
	}

}
