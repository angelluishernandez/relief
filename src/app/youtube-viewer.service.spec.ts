import { TestBed } from '@angular/core/testing';

import { YoutubeViewerService } from './youtube-viewer.service';

describe('YoutubeViewerService', () => {
  let service: YoutubeViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubeViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
