import { Observable } from 'rxjs/Observable';
import { PostService } from './post.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/Operators/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  author = 'Armando Londoño';
  isEditing: boolean;
  postToEdit: Post;
  posts: Post[];
  selectedPost: Post = new Post(0, '', '');

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.postService.getPosts().subscribe(posts => this.posts = posts);
  }

  savePost() {
    if (this.selectedPost.title.trim() !== '' || this.selectedPost.body.trim() !== '') {
      if (this.isEditing) {
        this.postToEdit.title = this.selectedPost.title;
        this.postToEdit.body = this.selectedPost.body;
        this.isEditing = false;
      } else {
        const newPostId: number = this.posts.reduce((max, post) => post.id > max ? post.id : max, this.posts[0].id);
        this.posts = [new Post(newPostId + 1, this.selectedPost.title, this.selectedPost.body), ...this.posts];
      }
      this.setSelectedPostValues('', '');
    }
  }

  removePost(postToRemove: Post) {
    this.posts = this.posts.filter(post => post.id !== postToRemove.id);
    this.posts.map(post => post.id = post.id > postToRemove.id  ? post.id - 1 : post.id);
  }

  editPost(post: Post) {
    this.isEditing = true;
    this.postToEdit = post;
    this.setSelectedPostValues(post.title, post.body);
  }

  cancelEdition() {
    this.isEditing = false;
    this.setSelectedPostValues('', '');
  }

  setSelectedPostValues(title, body) {
    this.selectedPost.title = title;
    this.selectedPost.body = body;
  }
}
