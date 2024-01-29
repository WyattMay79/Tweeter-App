import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/posts';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = 'http://localhost:5009/api/post';
  tokenKey: string = "myPostToken";

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  getPostByUsername(username: string | undefined): Observable<Post> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}` 
    }
    return this.http.get<Post>(`${this.baseUrl}/user/${username}`, { headers: reqHeaders});
  }

  getAllUserPosts(username: string): Observable<Post[]> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}` 
    }

    return this.http.get<Post[]>(`${this.baseUrl}/user/${username}`, { headers: reqHeaders });
  }

  createPost(newPost: Post) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    console.log(reqHeaders);
    return this.http.post(this.baseUrl, newPost, { headers: reqHeaders});
  }

  updatePost(updatedPost: Post) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    console.log(reqHeaders);
    return this.http.post(this.baseUrl, updatedPost, { headers: reqHeaders});
  }

  deletePost(postId: number) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    console.log(reqHeaders);
    return this.http.delete(this.baseUrl+'/'+ postId, { headers: reqHeaders});
  }
}
