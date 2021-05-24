import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "./post.model";

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  sendFetchedPosts = new Subject<Post[]>();

  constructor(
    private http: HttpClient,
  ) {}

  createAndStorePosts(postData) {
    this.http.post('https://jsonplaceholder.typicode.com/posts', postData).subscribe(responseBodyData => {
      console.log('responseBodyData =', responseBodyData);
    });
  }

  fetchPosts() {
    this.http.get<Post[]>('http://jsonplaceholder.typicode.com/posts')   
    .subscribe((data) => {
      this.sendFetchedPosts.next(data);
    })
  }

  clearPosts() {
    this.http.delete('https://jsonplaceholder.typicode.com/posts').subscribe(deleted => {
      console.log('deleted =', deleted);
    }, error => {
      
    })
  }
}