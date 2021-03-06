import { Component, OnInit, Input } from '@angular/core';
import { TranslationPickerService } from '../../core/services/translation-picker.service';
import { TeamPickerService } from '../../core/services/team-picker.service';

@Component({
  selector: 'app-pm-dropdown',
  templateUrl: './pm-dropdown.component.html',
  styleUrls: ['./pm-dropdown.component.scss']
})
export class PmDropdownComponent implements OnInit {
  @Input() itemsType: string;
  @Input() appearance: string;
  @Input() items: any[];
  @Input() defaultItem: any;
  @Input() dropdownWidth: string;
  selectedItemImgPath: string;

  constructor(private translationPickerService: TranslationPickerService, public teamPickerService: TeamPickerService) { }

  ngOnInit() {
    const resetToDefaultItem = this.items.find(item => item.value === this.defaultItem);
    this.selectedItemImgPath = resetToDefaultItem.img;
  }

  useCurrentSelection(itemValue: string) {
    const useDefaultItem = this.items.find(item => item.value === itemValue);
    this.selectedItemImgPath = useDefaultItem.img;
    if (this.itemsType === 'languages') {
      this.translationPickerService.setCurrentTranslation(itemValue);
    } else if (this.itemsType === 'teams') {
      const selectedTeam = this.items.find(team => team.value === itemValue);
      // console.log('selectedTeam: ', selectedTeam);
      // TO-DO fetch new login req and go the team-overview page (needed for the new team package authorization)
      // this.teamPickerService.setCurrentTeam(selectedTeam);
    }
  }
}
