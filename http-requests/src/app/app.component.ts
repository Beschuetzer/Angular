import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetchingPosts = false;
  error: HttpErrorResponse;

  private errorSubscription: Subscription;
  private fetchPostsSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private postsService: PostsService,
  ) {}

  ngOnInit() {
    this.fetchPostsSubscription = this.postsService.sendFetchedPosts.subscribe(posts => {
      this.loadedPosts = posts;
    })

    this.errorSubscription = this.postsService.errorClearSubject.subscribe(error => {
      this.error = error;
      this.isFetchingPosts = false;
    })
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
    this.fetchPostsSubscription.unsubscribe();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postsService.createAndStorePosts(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetchingPosts = true;
    this.postsService.fetchPosts();
    this.isFetchingPosts = false;
  }

  onClearPosts() {
    // Send Http request
    this.postsService.clearPosts();
  }

  onHandleError() {
    this.error = null;
  }
}
