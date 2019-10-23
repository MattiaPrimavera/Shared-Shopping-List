import { TestBed } from '@angular/core/testing';

import { AddItemBottomSheetService } from './add-item-bottom-sheet.service';

describe('AddItemBottomSheetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddItemBottomSheetService = TestBed.get(AddItemBottomSheetService);
    expect(service).toBeTruthy();
  });
});
