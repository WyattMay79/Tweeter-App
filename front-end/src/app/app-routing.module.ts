import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "/signin",
    pathMatch: "full"
  },
  {
  path: "signin",
  component: SignInComponent
  },
  {
    path: "signup",
    component: SignUpComponent
  },
  {
    path: "posts",
    component: PostListComponent
  },
  {
    path: "post/new",
    component: NewPostComponent
  },
  {
    path: "post/:username",
    component: EditPostComponent
  },
  {
    path: "user/:username",
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
