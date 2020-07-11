import { Video } from './../Video';
import { Component, OnInit, Input } from '@angular/core';
import { HostListener } from '@angular/core';
import { YoutubeViewerService } from '../youtube-viewer.service';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css'],
})
export class VideoViewComponent implements OnInit {
  innerWidth: number;
  innerHeight: number;
  videoWidth: string;
  videoHeight: string;

  constructor(private youtubeViewerService: YoutubeViewerService) {
    this.onResize();
  }

  @Input() currentVideoItem: object;

  // This directive is to listen to window width in order to resize the video iframe

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;

    // Set video width at 80% of viewport width

    const innerWidthToVideoWidth = this.innerWidth * 0.5;
    const innerHeightToVideoHeight = innerWidthToVideoWidth / (16 / 9);
    this.videoWidth = innerWidthToVideoWidth.toFixed().toString();
    this.videoHeight = innerHeightToVideoHeight.toFixed().toString();
  }

  onBookmarkAdded(video) {
    this.youtubeViewerService.addVideo('bookmarks', video);
  }

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }
}
