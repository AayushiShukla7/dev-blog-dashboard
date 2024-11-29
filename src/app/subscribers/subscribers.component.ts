import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.css'
})
export class SubscribersComponent implements OnInit {

  subscribersArray: Array<any> = [];

  constructor(private subscribersService: SubscribersService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.subscribersService.loadData()
    .then((res: any) => {
      //console.log(res);
      this.subscribersArray = res;
    })
    .catch(err => {
      console.log(err);
    })
  }

  onDelete(subId: any) {
    this.subscribersService.deleteData(subId);
    this.loadData();
  }

}
