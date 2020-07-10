import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  @Input() videos;
  @Output() videoID = new EventEmitter<String>();

  faLink = faLink;

  constructor() {}

  ngOnInit(): void {}

  deleteHistory() {
    localStorage.removeItem('history');
  }

  onWatchAgainClick(videoID) {
    this.videoID.emit(videoID);
  }
}
