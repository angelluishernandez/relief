import {
  Component,
  OnInit,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { YoutubeViewerService } from '../youtube-viewer.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  videos = [];
  historyHidden: Boolean;
  toggleSidebar: Boolean;
  smallScreen: Boolean;

  @Output() currentVideoItem = new EventEmitter<Object>();
  @Output() favouritedVideo = new EventEmitter<Object>();

  faLink = faLink;

  constructor(private youtubeViewerService: YoutubeViewerService) {
    // We use reverse to put the last item added first

    this.videos = this.youtubeViewerService.historyVideos.reverse() || [];
  }

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event'])
  onWindowResize(event?) {
    window.innerWidth > 1000
      ? (this.smallScreen = false)
      : (this.smallScreen = true);
  }

  onToggleSideBar() {
    this.toggleSidebar = !this.toggleSidebar;
  }

  onWatchAgainClick(video) {
    this.currentVideoItem.emit(video);
  }

  addToFavourites(video) {
    this.youtubeViewerService.addVideo('bookmarks', video);
  }

  deleteItem(video) {
    this.youtubeViewerService.deleteVideo('history', video);
    this.videos = this.youtubeViewerService.historyVideos;
  }

  deleteHistory(localStorageKey) {
    this.youtubeViewerService.clearStorageItem(localStorageKey);
    this.videos = [];
  }
}
