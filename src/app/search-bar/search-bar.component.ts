import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Output() videoID = new EventEmitter<String>();
  videoURL;

  onSubmitVideo() {
    this.videoID.emit(this.videoURL);
  }
}
