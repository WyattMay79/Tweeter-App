import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
      
  }

  signin(){
    this.userService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['posts']);
      },
      error: (err) => {
        console.log(err);
        window.alert('Unsuccessful login. Please try again.');
        this.router.navigate(['signin']);
      },
      complete: () => {
        console.log('Successfully logged in!');
      }

    });
  }

}
