import { Post } from 'src/app/models/posts';

export class User {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    age?: number;
    gender?: string;
    state?: string;
    city?: string;
    posts? = new Post() ;
  
    constructor(id?: number, username?: string, email?: string, password?: string, firstName?: string, lastName?: string, age?: number, gender?: string, state?: string, city?: string) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.gender = gender;
      this.state = state;
      this.city = city;
    }
}