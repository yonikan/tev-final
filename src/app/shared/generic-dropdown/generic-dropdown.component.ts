import { Component, OnInit, Input } from '@angular/core';
import { TranslationPickerService } from 'src/app/core/services/translation-picker.service';

@Component({
  selector: 'app-generic-dropdown',
  templateUrl: './generic-dropdown.component.html',
  styleUrls: ['./generic-dropdown.component.scss']
})
export class GenericDropdownComponent implements OnInit {
  @Input() items: any[];
  @Input() defaultItem: any;
  selectedItemImgPath: string;

  constructor(private translationPickerService: TranslationPickerService) { }

  ngOnInit() {
    // console.log(this.items);
    // console.log(this.defaultItem);
    const resetToDefaultItem = this.items.find(item => item.value === this.defaultItem);
    // console.log(test);
    this.selectedItemImgPath = resetToDefaultItem.flag;
  }

  useLanguage(language: string) {
    const useDefaultItem = this.items.find(item => item.value === language);
    this.selectedItemImgPath = useDefaultItem.flag;
    this.translationPickerService.setCurrentTranslation(language);
  }
}
