import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YoutubeViewerService {
  historyVideos = [];
  bookmarkedVideos = [];

  currentVideo = {};

  constructor() {
    this.historyVideos = this.getVideos('history') || [];
    this.bookmarkedVideos = this.getVideos('bookmarks') || [];
  }
  // History and favourites

  getVideos(localStorageKey: string) {
    return JSON.parse(localStorage.getItem(localStorageKey));
  }

  saveOnStorage(localStorageKey, videos): void {
    localStorage.setItem(localStorageKey, JSON.stringify(videos));
  }

  addVideo(localStorageKey: string, video: any): void {
    let videos = this.getVideos(localStorageKey) || [];
    videos.push(video);
    this.saveOnStorage(localStorageKey, videos);

    if (localStorageKey === 'history') {
      this.historyVideos.push(video);
    } else if (localStorageKey === 'bookmarks') {
      this.bookmarkedVideos.push(video);
    }
  }

  deleteVideo(video, localStorageKey) {
    const videoID = video.videoID;
    const videos = JSON.parse(localStorage.getItem(localStorageKey));
    const filteredVideos = videos.filter((video) => video.videoID === videoID);
    if (localStorageKey === 'history') {
      localStorage.setItem('history', JSON.stringify(filteredVideos));
      this.historyVideos = filteredVideos;
    } else if (localStorageKey === 'bookmarks') {
      localStorage.setItem('bookmarks', JSON.stringify(filteredVideos));
      this.bookmarkedVideos = filteredVideos;
    }
  }

  clearStorageItem(localStorageKey: string) {
    localStorage.removeItem(localStorageKey);
    if (localStorageKey === 'history') {
      this.historyVideos = [];
    } else if (localStorageKey === 'bookmarks') {
      this.bookmarkedVideos = [];
    }
  }
}
