import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { TeamEventValidationService } from '../../team-event-validation.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @Input() stepData: any;
  @Input() teamEventType: number;
  @Output() tagsEmitter = new EventEmitter<any>();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // teamEventTags: any[] = [
  //   {name: 'Defending'},
  //   {name: 'Recovery'},
  //   {name: 'Vertical'},
  // ];

  teamEventTags: any[] = [];
  teamEventTypeString: string;


  constructor() { }

  ngOnInit() {
    if (this.teamEventType === 1){
      this.teamEventTypeString = 'training';
    } else if (this.teamEventType === 2) {
      this.teamEventTypeString = 'match';
    } else {
      this.teamEventTypeString = 'session';
    };

    if(this.stepData.tags && this.stepData.tags.length > 0) {
      this.stepData.tags.forEach(tag => {
        this.teamEventTags.push({name: tag})
      });
    }
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



// import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
// import { COMMA, ENTER } from '@angular/cdk/keycodes';
// import { Observable } from 'rxjs';
// import { FormControl } from '@angular/forms';
// import { startWith, map } from 'rxjs/operators';
// import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';

// @Component({
//   selector: 'app-tags',
//   templateUrl: './tags.component.html',
//   styleUrls: ['./tags.component.scss']
// })
// export class TagsComponent implements OnInit, OnChanges {
//   @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
//   @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
//   @Input() stepData: any;
//   @Input() teamEventType: number;
//   @Output() tagsEmitter = new EventEmitter<any>();
//   tagCtrl = new FormControl();
//   visible = true;
//   selectable = true;
//   removable = true;
//   addOnBlur = true;
//   readonly separatorKeysCodes: number[] = [ENTER, COMMA];
//   teamEventTags: any[] = [];
//   filteredTags: Observable<string[]>;
//   teamEventTypeString: string;

//   constructor() {}

//   ngOnInit() {
//     if (this.teamEventType === 1){
//       this.teamEventTypeString = 'training';
//     } else if (this.teamEventType === 2) {
//       this.teamEventTypeString = 'match';
//     } else {
//       this.teamEventTypeString = 'session';
//     };

//     if(this.stepData.tags && this.stepData.tags.length > 0) {
//       this.stepData.tags.forEach(tag => {
//         this.teamEventTags.push({name: tag})
//       });
//     }
//   }

//   ngOnChanges(change) {
//     if (change.stepData && this.stepData) {
//       this.filteredTags = this.tagCtrl.valueChanges
//       .pipe(
//         startWith(null),
//         map((tag: string | null) => {
//           return tag ? this._filter(tag) : this.stepData.availableTagsList.slice();
//         }));
//     }
//   }

//   add(event): void {
//     if (this.matAutocomplete.isOpen) {
//       return
//     };
//     const input = event.input;
//     const value = event.value;

//     // Add our teamEventTag
//     if ((value || '').trim()) {
//       this.teamEventTags.push({name: value.trim()});
//     }

//     // Reset the input value
//     if (input) {
//       input.value = '';
//     }
//     this.sendToTeamEvent(this.teamEventTags);
//   }

//   selected(event: MatAutocompleteSelectedEvent): void {
//     this.teamEventTags.push({name: event.option.viewValue});
//     this.tagInput.nativeElement.value = '';
//     this.tagCtrl.setValue(null);
//   }

//   remove(teamEventTag: any): void {
//     const index = this.teamEventTags.indexOf(teamEventTag);
//     if (index >= 0) {
//       this.teamEventTags.splice(index, 1);
//     }
//     this.sendToTeamEvent(this.teamEventTags);
//   }

//   sendToTeamEvent(tags) {
//     this.tagsEmitter.emit(tags);
//   }

//   _filter(value: string): string[] {
//     const filterValue = value.toLowerCase();
//     return this.stepData.availableTagsList.filter(option => option.toLowerCase().includes(filterValue));
//   }
// }
