import { YoutubeViewerService } from './youtube-viewer.service';
import { Component, OnInit, Input } from '@angular/core';
import { YoutubeService } from './youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'relief';
  currentVideoItem: object;

  setCurrentVideo($event) {
    this.currentVideoItem = $event;
  }
}
