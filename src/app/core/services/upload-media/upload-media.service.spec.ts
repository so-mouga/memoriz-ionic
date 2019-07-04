import { TestBed } from '@angular/core/testing';

import { UploadMediaService } from './upload-media.service';

describe('UploadMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadMediaService = TestBed.get(UploadMediaService);
    expect(service).toBeTruthy();
  });
});
