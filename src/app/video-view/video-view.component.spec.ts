import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoViewComponent } from './video-view.component';
import { YoutubeViewerService } from '../youtube-viewer.service';

describe('VideoViewComponent', () => {
  let component: VideoViewComponent;
  let fixture: ComponentFixture<VideoViewComponent>;
  let expectedCurrentVideo = {
    title:
      'Curso de Angular - Introducción al Testing con Karma, Protractor, Jasmine',
    videoID: 'a1qKds0IQ_4',
    thumbnail: 'string',
    videoUrl: 'https://www.youtube.com/watch?v=a1qKds0IQ_4',
  };

  let service: YoutubeViewerService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoViewComponent],
    }).compileComponents(),
      (service = TestBed.get(YoutubeViewerService));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoViewComponent);
    component = fixture.componentInstance;
    component.currentVideoItem = expectedCurrentVideo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('currentVideoItem should exists and it should be an object', () => {
    expect(component.currentVideoItem).toBeTruthy();
    expect(component.currentVideoItem).toBeInstanceOf(Object);
  });
});
