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
  categoryArray: Array<any> = [];
  formStatus: string = 'Add';
  categoryId: string = '';

  constructor(private categoriesService: CategoriesService) {
    this.loadCategories();
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService.loadData()
    .then(res => {
      this.categoryArray = res;
    });
  }

  onSubmit(formData:any) {
    let categoryData: Category = {
      category: formData.value.category
    }

    if(this.formStatus == 'Add') {
      this.categoriesService.saveData(categoryData);    
    }
    else if(this.formStatus == 'Edit') {
      this.categoriesService.updateData(this.categoryId, formData.value);
    }

    this.loadCategories();
    formData.reset();    
  }   

  onEdit(clickedObj:any, category:any) {
    this.categoryId = clickedObj["id"];
    this.categoryData = category;
    this.formStatus = 'Edit';
  }

  onDelete(clickedObj:any) {
    if(confirm("Are you sure you want to delete this category?")) {
      this.categoryId = clickedObj["id"];
      this.categoriesService.deleteData(this.categoryId);      
    }    
    this.loadCategories();
  }

}
