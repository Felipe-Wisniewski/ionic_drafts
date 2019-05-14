import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Feed } from './feed';
import { FollowService } from './follow.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.page.html',
  styleUrls: ['./follow.page.scss'],
})
export class FollowPage implements OnInit {

  feed$: Observable<Feed[]>;

  constructor(private followService: FollowService) { }

  ngOnInit() {
    this.getFeed();
  }

  getFeed() {
    this.feed$ = this.followService.getFeed();
  }

  onClick(link) {
    window.open(link);
  }
}
