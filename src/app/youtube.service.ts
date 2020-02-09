import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  apiKey : string = 'AIzaSyALz9JCfE7GzZN5-uDjFNrT61tyCeX2l20';

  constructor(public http: HttpClient) { }

  getVideosForChanel(playListID, nextPageToken) {
    console.log("nextPageToken ", nextPageToken);

    let url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + playListID + "&maxResults=50&key=" + this.apiKey + "&nextPageToken=" + nextPageToken;
    return this.http.get(url).toPromise();
  }
}
