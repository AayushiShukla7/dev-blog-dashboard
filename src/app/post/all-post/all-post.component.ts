import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-post',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent implements OnInit {

  postArray: Array<any> = [];

  constructor(private postsService: PostsService)  {}

  ngOnInit(): void {
    this.postsService.loadData()
    .then(res => {
      //console.log(res);
      this.postArray = res;
    });
  }

}
