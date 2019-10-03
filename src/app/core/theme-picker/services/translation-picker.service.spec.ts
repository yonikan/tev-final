import { TestBed } from '@angular/core/testing';

import { TranslationPickerService } from './translation-picker.service';

describe('TranslationPickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranslationPickerService = TestBed.get(TranslationPickerService);
    expect(service).toBeTruthy();
  });
});
