import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'final-project';
  isLoggedIn: boolean = false;
  private tokenKey: string = "myPostToken";

  private _loggedIn = new BehaviorSubject(false);
  loggedIn = this._loggedIn.asObservable();

  constructor(private userService: UserService, private router: Router) {
    if (localStorage.getItem(this.tokenKey)){
      this._loggedIn.next(true);
    }
  }


  ngOnInit(): void {
    this.userService.loggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  isloggedIn() {
    this.userService.loggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      
      if(!this.isLoggedIn) {
        this.router.navigate(['signin']);
      }
    });
  }

  isLoggedOut() {
    this.userService.logOut();
    this.router.navigate(['posts']);
  }

}
