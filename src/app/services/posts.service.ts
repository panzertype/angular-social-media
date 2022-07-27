import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IPost from '../models/interfaces/IPost';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  posts: IPost[] = [];

  // getAll(): Observable<IPost[]> {
  //   return this.http.get<IPost[]>(
  //     'https://jsonplaceholder.typicode.com/photos'
  //   );
  // }

  getPosts(startNum: number, limit: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(
      `https://jsonplaceholder.typicode.com/photos?_start=${startNum}&_limit=${limit}`
    );
  }
}
