import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{

  categoryData: string = '';
  categoryArray: Array<object> = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.loadData()
    .then(res => {
      //console.log(res);
      this.categoryArray = res;
      console.log(this.categoryArray);
    });
  }

  onSubmit(formData:any) {
    let categoryData: Category = {
      category: formData.value.category
    }

    this.categoriesService.saveData(categoryData);    
  }   

}
