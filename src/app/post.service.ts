import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) {
    this.getPosts();
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

}
