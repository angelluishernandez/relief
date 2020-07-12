import { environment } from './../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  apiKey = environment.API_KEY;

  constructor(public http: HttpClient) {}

  getVideoInfo(videoID) {
    let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoID}&key=${this.apiKey}`;

    return this.http.get(url).pipe(
      map(
        (res) => res,
        (error) => error
      )
    );
  }
}
