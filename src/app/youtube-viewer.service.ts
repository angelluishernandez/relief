import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YoutubeViewerService {
  historyVideos = [];
  bookmarkedVideos = [];

  currentVideo = {};

  constructor() {
    // On initial rendering these arrays get the info from local storage

    this.historyVideos = this.getVideos('history') || [];
    this.bookmarkedVideos = this.getVideos('bookmarks') || [];
  }
  // History and favourites

  // Get item on storage

  getVideos = (localStorageKey: string) =>
    JSON.parse(localStorage.getItem(localStorageKey));

  // Save on storage

  saveOnStorage(localStorageKey, videos): void {
    localStorage.setItem(localStorageKey, JSON.stringify(videos));
  }

  // This function creates a new array in which the the current localStorage and the new video are placed
  // Once this is done the video is pushed to the corresponding array

  addVideo(localStorageKey: string, video: any): void {
    let videos = this.getVideos(localStorageKey) || [];
    videos.push(video);

    if (localStorageKey === 'history') {
      this.saveOnStorage(localStorageKey, videos);
      this.historyVideos.push(video);
      this.historyVideos.reverse();
    } else if (localStorageKey === 'bookmarks') {
      this.saveOnStorage(localStorageKey, videos);

      // If video already exists don't push it into the array.

      const videoExists = this.bookmarkedVideos.some(
        (bookmark) => bookmark.videoUrl === video.videoUrl
      );

      if (videoExists) {
        console.log('The video already exists');
      } else {
        this.bookmarkedVideos.push(video);
        this.bookmarkedVideos.reverse();
      }
    }
  }

  // This function searches for the videos that have the same url.

  // If the url is the same it will return an array without the selected video.

  // Then both local storage and the corresponding array will be updated

  deleteVideo(localStorageKey, video) {
    const videoUrl = video.videoUrl;
    const videos = JSON.parse(localStorage.getItem(localStorageKey));
    const filteredVideos = videos.filter(
      (video) => video.videoUrl !== videoUrl
    );

    if (localStorageKey === 'history') {
      localStorage.setItem('history', JSON.stringify(filteredVideos));
      this.historyVideos = filteredVideos;
    } else if (localStorageKey === 'bookmarks') {
      localStorage.setItem('bookmarks', JSON.stringify(filteredVideos));
      this.bookmarkedVideos = filteredVideos;
    }
  }

  // This function will erase an item in localStorage

  clearStorageItem(localStorageKey: string) {
    localStorage.removeItem(localStorageKey);
    if (localStorageKey === 'history') {
      this.historyVideos = [];
    } else if (localStorageKey === 'bookmarks') {
      this.bookmarkedVideos = [];
    }
  }
}
