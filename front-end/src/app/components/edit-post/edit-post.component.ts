import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/posts';

import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  routeUsername: string = '';
  edittedPost: Post = new Post();
  user: User = new User();

  constructor(private postService: PostService, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
      const routeUsername = this.activatedRoute.snapshot.paramMap.get('username') ?? "";
      this.userService.getUser(routeUsername);
      console.log(routeUsername);
      console.log(this.activatedRoute.snapshot.paramMap);
      this.postService.getPostByUsername(routeUsername).subscribe(res => {
        console.log('Retrieved post: ', res);
        this.edittedPost = res;
      })
  }

  editPost() {
    this.postService.getPostByUsername(this.routeUsername).subscribe({
      next: () => {
        window.alert('Post updated successfully!');
        this.router.navigate(['/post/', this.routeUsername]);
      },
      error: (error: { status: number;}) => {
        console.log('Error: ', error);
        if (error.status === 401 || error.status === 403 ) {
          this.router.navigate(['signin']);
        }
      },
      complete: () => {
        console.log('Post updated successfully!');
      }
    })
  }

}
