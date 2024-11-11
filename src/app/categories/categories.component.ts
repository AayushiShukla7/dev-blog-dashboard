import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

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
export class CategoriesComponent {

  categoryData: string = '';

  constructor(private categoriesService: CategoriesService) {}

  onSubmit(formData:any) {
    let categoryData: Category = {
      category: formData.value.category
    }

    this.categoriesService.saveData(categoryData);    
  }   

}
