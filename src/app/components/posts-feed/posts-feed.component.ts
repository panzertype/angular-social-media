import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-feed',
  templateUrl: './posts-feed.component.html',
  styleUrls: ['./posts-feed.component.scss'],
})
export class PostsFeedComponent implements OnInit {
  constructor() {}

  posts = [1, 2, 3, 4];

  ngOnInit(): void {}
}
