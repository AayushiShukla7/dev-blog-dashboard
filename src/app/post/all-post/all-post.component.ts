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
    this.loadData();
  }

  loadData() {
    this.postsService.loadData()
    .then(res => {
      //console.log(res);
      this.postArray = res;
    });
  }

  onDelete(postId: any) {
    if(confirm("Are you sure you wish to delete this post?")) {
      this.postsService.deleteData(postId);
      this.loadData();
    }    
  }

  onFeatured(postId: any, featuredStatus: boolean) {
    const featuredData = {
      isFeatured: featuredStatus
    };

    this.postsService.markFeatured(postId, featuredData);
    this.loadData();
  }

}
