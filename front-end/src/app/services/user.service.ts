import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:5009/api/Auth';
  private tokenKey: string = "myPostToken";

  private _loggedIn = new BehaviorSubject(false);
  loggedIn = this._loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem(this.tokenKey)){
      this._loggedIn.next(true);
    }
  }

  signUp(newUser: User){
    //delete NewUser.createdOn;

    return this.http.post(`${this.baseUrl}/register`, newUser);
  }

  login(email: string, password: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', email);
    queryParams = queryParams.append('password', password);
    console.log(queryParams);

    return this.http.get(`${this.baseUrl}/login`, { params: queryParams, responseType: 'text'}).pipe(tap((response: any) => {
      localStorage.setItem('myPostToken', response);
      if(response){
        this._loggedIn.next(true);
      } else{
        this._loggedIn.next(false);
      }
      console.log(response);
    }));

    // getCurrentUser(): Observable<User> {fill body}
    // getUser(id: string): Observable<User> {fill body} 
    //searchUsers(searchText: string): Observable<User[]> {fill body}
  }

  logOut() {
    localStorage.removeItem(this.tokenKey);
    this._loggedIn.next(false);
    this.router.navigate(['signin']);
  }

  getUser(username: string): Observable<User> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };

    return this.http.get<User>(`${this.baseUrl}/api/user/${username}`, {headers: reqHeaders})
  }

  getCurrentUser(): Observable<User> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };

    return this.http.get<User>(`${this.baseUrl}/api/user`, {headers: reqHeaders });
  }
}
