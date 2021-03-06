import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "app-ytiframe",
  templateUrl: "./ytiframe.component.html",
  styleUrls: ["./ytiframe.component.css"]
})
export class YTIframeComponent implements OnInit, OnChanges {
  /* 1. Some required variables which will be used by YT API*/
  public YT: any;
  public video: any;
  public player: any;
  public reframed: boolean = false;

  @Input() videoId: string;

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  /* 2. Initialize method for YT IFrame API */
  init() {
    // Return if Player is already created
    if (window["YT"]) {
      this.startVideo();
      return;
    }

    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    window["onYouTubeIframeAPIReady"] = () => this.startVideo();
  }

  ngOnInit() {
    this.video = this.videoId;
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.player) {
      console.log("Player could not be found.");
    } else {
      this.player.stopVideo();
      this.player.destroy();
      this.player = null;
      this.video = this.videoId;
      this.init();
    }
  }

  startVideo() {
    this.reframed = false;
    this.player = new window["YT"].Player("player", {
      videoId: this.video,
      height: 200,
      width: 300,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 1,
        fs: 1,
        playsinline: 1
      },
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
        onError: this.onPlayerError.bind(this),
        onReady: this.onPlayerReady.bind(this)
      }
    });
  }

  /* 4. It will be called when the Video Player is ready */
  onPlayerReady(event) {
    if (this.isRestricted) {
      event.target.mute();
      event.target.playVideo();
    } else {
      event.target.playVideo();
    }
  }

  /* 5. API will call this function when Player State changes like PLAYING, PAUSED, ENDED */
  onPlayerStateChange(event) {
    console.log(event);
    switch (event.data) {
      case window["YT"].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log("started " + this.cleanTime());
        } else {
          console.log("playing " + this.cleanTime());
        }
        break;
      case window["YT"].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log("paused" + " @ " + this.cleanTime());
          event.target.playVideo();
        }
        break;
      case window["YT"].PlayerState.ENDED:
        console.log("ended ");
        break;
    }
  }

  cleanTime() {
    return Math.round(this.player.getCurrentTime());
  }

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log("" + this.video);
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }
}
