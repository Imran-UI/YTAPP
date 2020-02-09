import { Component, OnInit, OnDestroy } from '@angular/core';
import { YoutubeService } from './youtube.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'YTAPP';
  searchValue: string;
  showVideo: boolean;
  videoId: string;
  nextPageToken: string = '';
  totalResults: number;
  playListId: string = 'PLVjT0G6z-k9LwFZd2GdHbev7u7AscKdEK';

  pageTokenArr = ['CDIQAA', 'CDIQAQ', 'CGQQAA', 'CJYBEAA', 'CMgBEAA', 'CPoBEAA', 'CKwCEAA'];


  videos: any[];
  tempVideos: any[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private youTubeService: YoutubeService) { }

  ngOnInit() {
    this.videos = [];
    this.youTubeService
    .getVideosForChanel(this.playListId, this.nextPageToken)
    .then(lista => {
      for (let element of lista["items"]) {
        this.videos.push(element);
      }
      this.nextPageToken = lista['nextPageToken'];
      this.totalResults = lista['pageInfo'].totalResults;
      this.tempVideos = [...this.videos];
    });

  }

  nextPage() {
    this.youTubeService
    .getVideosForChanel(this.playListId, this.nextPageToken)
      .then(lista => {
      this.videos = [];
      for (let element of lista["items"]) {
        this.videos.push(element);
      }
      this.nextPageToken = lista['nextPageToken'];
      this.totalResults = lista['pageInfo'].totalResults;
      this.tempVideos = [...this.videos];
    });
  }

  filterVideos(event) {
    let filteredVideos = this.videos.filter((video) => {
      return video.snippet.title.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1;
    });

    if (filteredVideos.length) {
      this.videos = filteredVideos;
    }

    if (!this.searchValue) {
      this.videos = this.tempVideos;
    }

  }

  playVideo(videoID) {
    this.videoId = videoID;
    this.showVideo = true;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
