import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';
import { YoutubeViewerService } from '../youtube-viewer.service';
import { By } from '@angular/platform-browser';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let service: YoutubeViewerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryComponent],
    }).compileComponents(),
      (service = TestBed.get(YoutubeViewerService));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a service', () => {
    expect(service).toBeTruthy();
  });

  it('should render all the elements in the this.videos array', () => {
    component.videos = [
      {
        title:
          'Curso de Angular - Introducción al Testing con Karma, Protractor, Jasmine',
        videoID: 'a1qKds0IQ_4',
        thumbnail: 'string',
        videoUrl: 'https://www.youtube.com/watch?v=a1qKds0IQ_4',
      },
      {
        title:
          'Curso de Angular - Introducción al Testing con Karma, Protractor, Jasmine',
        videoID: 'a1qKds0IQ_4',
        thumbnail: 'string',
        videoUrl: 'https://www.youtube.com/watch?v=a1qKds0IQ_4',
      },
    ];
    fixture.detectChanges();

    const cardsCount = fixture.debugElement.queryAll(By.css('.card'));

    expect(cardsCount.length).toEqual(2);
  });
});
