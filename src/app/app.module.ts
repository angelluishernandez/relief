// Modules

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { VideoViewComponent } from './video-view/video-view.component';
import { HistoryComponent } from './history/history.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    VideoViewComponent,
    HistoryComponent,
    BookmarksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    YouTubePlayerModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
