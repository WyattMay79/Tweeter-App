import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/posts';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  newPost: Post = new Post();
  isLoggedIn: boolean = false;

  constructor(private postService: PostService, private userService:  UserService, private router: Router) {}

  ngOnInit(): void {
      this.userService.loggedIn.subscribe((loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        
        if(!this.isLoggedIn) {
          this.router.navigate(['signin']);
        }
      });
  }

  addPost() {
    if (!this.isLoggedIn){
      return;
    }

    this.postService.createPost(this.newPost).subscribe({
      next: () => {
        window.alert('New post added!');
        this.router.navigate(['user']);
      },
      error: (err: { status: number; }) => {
        console.log('Error: ', err);
        if (err.status === 401 || err.status === 403) {
          this.router.navigate(['signin']);
        }
      },
      complete: () => {
        console.log('Post successfully created!');
      }
    })

  }

}
