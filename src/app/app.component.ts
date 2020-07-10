import { Component, OnInit } from '@angular/core';
import { YoutubeService } from './youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'relief';
  currentVideoID: String;
  currentVideo: Object;
  videos = [];
  favourites = [];

  // Lifecycle//
  /////////////

  constructor(private youtubeService: YoutubeService) {}

  // Lifecycle//
  /////////////

  ngOnInit(): void {
    const currentHistory = this.readHistory();

    // If currentHistory returns null set videos to an ampty array
    this.videos = currentHistory || [];
  }
  // Methods //
  /////////////

  // Rewrites history in localStorage with the current array of videos

  saveHistory(videos) {
    localStorage.setItem('history', JSON.stringify(videos));
  }

  // Gets history and translates it into an array

  readHistory = () => JSON.parse(localStorage.getItem('history'));

  onVideoAdded(video) {
    this.currentVideoID = video.split('v=')[1];
    this.youtubeService
      .getVideoInfo(this.currentVideoID)
      .subscribe((data: any) => {
        const snippet = data.items[0].snippet;
        this.currentVideo = {
          title: snippet.title,
          thumbnail: snippet.thumbnails.standard.url,
          videoUrl: video,
          videoID: this.currentVideoID,
          inFavourites: false,
        };

        this.videos.push(this.currentVideo);
        this.saveHistory(this.videos);
      });
  }

  // Watch clicked video when user clicks in history

  onHistoryVideoClick(videoID) {
    this.currentVideoID = videoID;
  }

  // Add video to favourites

  onFavourited(video) {}
}
