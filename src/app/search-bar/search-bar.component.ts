import { YoutubeService } from './../youtube.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { YoutubeViewerService } from '../youtube-viewer.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  videoURL: String;
  videoID: String;
  currentVideo: Object;

  @Output() currentVideoItem = new EventEmitter<Object>();

  constructor(
    private youtubeViewerService: YoutubeViewerService,
    private youtubeService: YoutubeService
  ) {}

  onAddedVideo(videoURL) {
    this.videoID = videoURL.split('v=')[1];
    this.youtubeService.getVideoInfo(this.videoID).subscribe((data: any) => {
      const snippet = data.items[0].snippet;
      this.currentVideo = {
        title: snippet.title,
        thumbnail: snippet.thumbnails.standard.url,
        videoUrl: videoURL,
        videoID: this.videoID,
      };

      this.youtubeViewerService.addVideo('history', this.currentVideo);
      this.currentVideoItem.emit(this.currentVideo);
    });
  }
}
