import { TestBed } from '@angular/core/testing';

import { UpdateItemBottomSheetService } from './update-item-bottom-sheet.service';

describe('UpdateItemBottomSheetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateItemBottomSheetService = TestBed.get(UpdateItemBottomSheetService);
    expect(service).toBeTruthy();
  });
});
