import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public imgSrcList: any = [
    {
      src: "assets/media/icons/news/github_icon_yellow.svg",
      focusColor: "#ffffff",
      alt: "github",
      hover: false
    },
    {
      src: "assets/media/icons/news/twitter_icon_yellow.svg",
      focusColor: "#00ACEE",
      alt: "twitter",
      hover: false
    },
    {
      src: "assets/media/icons/news/telegram_icon_yellow.svg",
      focusColor: "#37AEE2",
      alt: "telegram",
      hover: false
    },
    {
      src: "assets/media/icons/news/discord_icon_yellow.svg",
      focusColor: "#7289DA",
      alt: "discord",
      hover: false
    },
    {
      src: "assets/media/icons/news/reddit_icon_yellow.svg",
      focusColor: "#FF4500",
      alt: "reddit",
      hover: false
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
