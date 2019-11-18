import { TestBed } from '@angular/core/testing';

import { QrCodeReaderService } from './qr-code-reader.service';

describe('QrCodeReaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QrCodeReaderService = TestBed.get(QrCodeReaderService);
    expect(service).toBeTruthy();
  });
});
