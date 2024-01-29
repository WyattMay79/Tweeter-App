import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  newUser: User =  new User();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {}

  signUp() {
    this.userService.signUp(this.newUser).subscribe({
      next: () => {
        window.alert('User Registration Successfully!');
        this.router.navigate(['signin']);
      },
      error: (err: any[]) => {
        window.alert('User Registration Failure' + err);
      },
      complete: () => {
        console.info('User Registered Successfully');
      }
    });
  }
}
