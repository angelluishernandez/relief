import { YoutubeService } from './../youtube.service';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { YoutubeViewerService } from '../youtube-viewer.service';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let service: YoutubeViewerService;
  let youtubeService: YoutubeService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [HttpClientModule],
      providers: [YoutubeViewerService, YoutubeService],
    }).compileComponents(),
      (service = TestBed.get(YoutubeViewerService)),
      (youtubeService = TestBed.get(YoutubeService));
  }));

  // Mock localStorage

  beforeEach(() => {
    let store = {};
    const mockLocalStorage = {
      setItem: (key: string, value: any) => {
        store[key] = `${value}`;
      },
      getItem: (key: string) => {
        return key in store ? store[key] : null;
      },
    };
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Tests

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should call addVideo on click ', () => {
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.onAddedVideo).toHaveBeenCalled();
    });
  });

  // write to localStorage test

  it('should write data in localStorage', () => {
    let videoData = {
      title:
        'Curso de Angular - Introducción al Testing con Karma, Protractor, Jasmine',
      videoID: 'a1qKds0IQ_4',
      thumbnail: 'string',
      videoUrl: 'https://www.youtube.com/watch?v=a1qKds0IQ_4',
    };
    let localStorageKey = 'history';
    service.addVideo(localStorageKey, videoData);
    expect(localStorage.getItem(localStorageKey)).toEqual(
      JSON.stringify([videoData])
    );
  });

  it('should return no errors when setting an item in local storage', () => {
    let videoData = {
      title:
        'Curso de Angular - Introducción al Testing con Karma, Protractor, Jasmine',
      videoID: 'a1qKds0IQ_4',
      thumbnail: 'string',
      videoUrl: 'https://www.youtube.com/watch?v=a1qKds0IQ_4',
    };
    let localStorageKey = 'history';

    service.addVideo(localStorageKey, videoData);
    expect(component.error).toBeFalse();
  });

  // it('should  error = true  if no youtube video url is provided', () => {
  //   let videoURL = 'INVALID URL';
  //   component.onAddedVideo(videoURL);
  //   youtubeService.getVideoInfo(videoURL).subscribe((data) => {
  //     let items = data.hasOwnProperty('items');
  //     expect(items).toBeInstanceOf(Array);
  //   });
  // });
});
