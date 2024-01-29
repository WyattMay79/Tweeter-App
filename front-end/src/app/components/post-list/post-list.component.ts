import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/posts';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  newPost: Post = new Post();
  user: User = new User();
  postList: Post[] = [];
  userList: User[] = [];
  isLoggedIn: boolean = false;
  

  constructor(private postService: PostService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
      this.postService.getAllPosts().subscribe((posts: Post[]) => {
        this.postList = posts;
      });
      this.userService.loggedIn.subscribe((loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        
        if(!this.isLoggedIn) {
          this.router.navigate(['signin']);
        }
      });
  }

  deletePost(postId: number | undefined) {
    if (postId) {
        this.postService.deletePost(postId).subscribe({
            next: () => {
                window.alert('Post deleted successfully!');
                // Remove the deleted post from the postList
                this.postList = this.postList.filter(post => post.postId !== postId);
            },
            error: (error) => {
                console.log('Error deleting post:', error);
            }
        });
    }
  }

  isloggedIn() {
    this.userService.loggedIn.subscribe((loggedIn) => {
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
        this.router.navigate(['posts']);
      },
      error: (err) => {
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


  editPost() {
   


  }

}
