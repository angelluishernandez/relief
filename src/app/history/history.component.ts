import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { YoutubeViewerService } from '../youtube-viewer.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  videos = [];

  @Output() currentVideoItem = new EventEmitter<Object>();
  @Output() favouritedVideo = new EventEmitter<Object>();

  faLink = faLink;

  constructor(private youtubeViewerService: YoutubeViewerService) {
    this.videos = this.youtubeViewerService.historyVideos || [];
  }

  ngOnInit(): void {}

  onWatchAgainClick(video) {
    this.currentVideoItem.emit(video);
  }

  deleteItem(video) {
    this.youtubeViewerService.deleteVideo(video, 'history');
    this.videos = this.youtubeViewerService.historyVideos;
  }

  deleteHistory(localStorageKey) {
    this.youtubeViewerService.clearStorageItem(localStorageKey);
    this.videos = [];
  }
}
