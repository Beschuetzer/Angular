import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  sendFetchedPosts = new Subject<Post[]>();
  errorClearSubject = new Subject<HttpErrorResponse>();

  constructor(private http: HttpClient) {}

  createAndStorePosts(postData) {
    const config = {
      headers: new HttpHeaders({
        test: 'test',
      }),
      observe: 'response',
    };

    this.http
      .post(
        'https://jsonplaceholder.typicode.com/posts',
        postData,
        config as any
      )
      .subscribe((responseBodyData) => {
        console.log('responseBodyData =', responseBodyData);
      });
  }

  fetchPosts() {
    let params = new HttpParams();
    params = params.append('someKey', 'someValue');
    params = params.append('anotherKey', 'anotherValue');
    //=> ?someKey=someValue&anotherKey=anotherValue

    const config = {
      headers: new HttpHeaders({
        'custom-header': 'hello!',
      }),
      params, //<----adding params to config object
    };

    this.http
      .get<Post[]>('http://jsonplaceholder.typicode.com/posts', config)
      .subscribe(
        (data) => {
          this.sendFetchedPosts.next(data);
        },
        (error) => {
          console.log('error =', error);
        }
      );
  }

  clearPosts() {
    const config = {
      responseType: 'json', //<-- 'blob' (files) and 'text' 
    };

    this.http
      .delete('https://jsonplaceholder.typicode.com/posts', config as any)
      .subscribe(
        (deleted) => {
          console.log('deleted =', deleted);
        },
        (error) => {
          this.errorClearSubject.next(error);
        }
      );
  }
}
