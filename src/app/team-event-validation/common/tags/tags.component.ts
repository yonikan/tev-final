import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { TeamEventValidationService } from '../../team-event-validation.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @Output() tagsEmitter = new EventEmitter<any>();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  teamEventTags: any[] = [
    {name: 'Defending'},
    {name: 'Recovery'},
    {name: 'Vertical'},
  ];

  constructor() { }

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our teamEventTag
    if ((value || '').trim()) {
      this.teamEventTags.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(teamEventTag: any): void {
    const index = this.teamEventTags.indexOf(teamEventTag);

    if (index >= 0) {
      this.teamEventTags.splice(index, 1);
    }
  }

  sendToTeamEvent(tags) {
    this.tagsEmitter.emit(tags);
  }
}
