import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Post } from 'src/app/models/posts';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  postList: Post[] = [];

  constructor(
    private postService: PostService, 
    private router: Router, 
    private actRoute: ActivatedRoute, 
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log(this.actRoute.snapshot.paramMap);
    let username: string = this.actRoute.snapshot.paramMap.get("username") ?? "";
    console.log(username);
    this.userService.getCurrentUser().subscribe(user => {
        this.user = user;
        if (this.user && this.user.id !== undefined) {
          this.postService.getAllUserPosts(username).subscribe(posts => {
          this.postList = posts;
        });}
        
      },
        err => {
          console.log('Error getting current user: ', err);
        }
    );
    

  }


  deletePost(id: number) {
      this.postService.deletePost(id = parseInt(this.actRoute.snapshot.paramMap.get("id")?? "")).subscribe(res => {
      window.alert('Post was deleted successfully!')
      console.log(res);
      this.postList = this.postList.filter(post => post.postId !== id);
      this.router.navigateByUrl("/user");
    },
      err => {
        console.log('Error deleting post: ', err);
      }
      
    );
  }
}
