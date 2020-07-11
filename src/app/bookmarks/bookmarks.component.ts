import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { YoutubeViewerService } from '../youtube-viewer.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit {
  faLink = faLink;

  videos = [];

  @Output() currentVideoItem = new EventEmitter<Object>();

  constructor(private youtubeViewerService: YoutubeViewerService) {
    this.videos = this.youtubeViewerService.bookmarkedVideos || [];
  }

  ngOnInit(): void {}

  onWatchAgainClick(video) {
    this.currentVideoItem.emit(video);
  }

  deleteBookmarks(localStorageKey) {
    this.youtubeViewerService.clearStorageItem(localStorageKey);
    this.videos = [];
  }

  deleteItem(video) {
    this.youtubeViewerService.deleteVideo(video, 'history');
    this.videos = this.youtubeViewerService.bookmarkedVideos;
  }
}
