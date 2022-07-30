import { PostsService } from './../../services/posts.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import IPost from 'src/app/models/interfaces/IPost';
import { BehaviorSubject, Observable } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map, tap, scan, mergeMap, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-posts-feed',
  templateUrl: './posts-feed.component.html',
  styleUrls: ['./posts-feed.component.scss'],
})
export class PostsFeedComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;

  @ViewChild('list')
  list!: ElementRef;

  batch = 10;
  theEnd = false;
  itemSize = 686;
  maxItemSize = 686;

  offset = new BehaviorSubject(0);
  infinite!: Observable<any[]>;

  posts: IPost[] = [];
  posts$!: Observable<IPost[]>;

  constructor(public postsService: PostsService) {
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap((n) => this.getBatch(n)),
      scan((acc: IPost[], batch) => {
        return [...acc, ...batch];
      }, [])
    );

    this.infinite = batchMap.pipe(map((v) => Object.values(v)));
  }

  getBatch(offset: number) {
    console.log(offset);
    return this.postsService.getPosts(offset, this.batch);
  }

  nextBatch(e: any, offset: number) {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    // console.log(`${end}, '>=', ${total}`);
    if (end === total) {
      this.theEnd = true;
      this.offset.next(offset);
    }
  }

  trackByIdx(i: any) {
    return i;
  }

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    if (this.list?.nativeElement?.children[0]?.children[0]?.children[0]) {
      const a = this.list.nativeElement.children[0].children[0].children[0];
      const b = a.getBoundingClientRect().height;
      if (this.itemSize !== b && b <= this.maxItemSize) {
        this.itemSize = b;
        console.log(this.itemSize);
      }
    }
  }
}
