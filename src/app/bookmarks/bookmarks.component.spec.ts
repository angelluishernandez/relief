import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { BookmarksComponent } from './bookmarks.component';
import { YoutubeViewerService } from '../youtube-viewer.service';
import { By } from '@angular/platform-browser';

describe('BookmarksComponent', () => {
  let component: BookmarksComponent;
  let fixture: ComponentFixture<BookmarksComponent>;
  let service: YoutubeViewerService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookmarksComponent],
    }).compileComponents();
    service = TestBed.get(YoutubeViewerService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should return the number of bookmarks', () => {
    expect(component.videos.length).toBe(0);
  });

  it('should return the number of videos in bookmarks', () => {
    component.videos = ['one video', 'two videos'];
    expect(component.videos.length).toBe(2);
  });

  it('if videos length > 1 should allow to execute toggleFunction && button should exists', () => {
    component.videos = ['one video', 'two videos'];
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector(
      '.button-default'
    );
    expect(button).toBeTruthy();

    expect(component.videos.length).toBe(2);
  });

  it('should call toggleBookmarks on click', () => {
    component.videos = ['one video', 'two videos'];
    fixture.detectChanges();
    spyOn(component, 'onToggleBookmarks');
    fixture.debugElement.nativeElement.querySelector('.button-default').click();

    expect(component.onToggleBookmarks).toHaveBeenCalled();
  });

  it('should return emit a video when watch again is clicked', () => {
    component.videos = ['one video', 'two videos'];
    component.toggleBookmarks = true;
    spyOn(component.currentVideoItem, 'emit');

    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('.button-watch').click();

    expect(component.currentVideoItem.emit).toHaveBeenCalled();
  });

  it('should call onWatchAgainClick on click', () => {
    component.videos = ['one video', 'two videos'];
    component.toggleBookmarks = true;
    fixture.detectChanges();
    spyOn(component, 'onWatchAgainClick');
    fixture.debugElement.nativeElement.querySelector('.button-watch').click();
    expect(component.onWatchAgainClick).toHaveBeenCalled();
  });
});
