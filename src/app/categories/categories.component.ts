import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

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

  constructor(private firestore: Firestore) {}

  onSubmit(formData:any) {
    let categoryData = {
      category: formData.value.category
    }

    let subCategoryData = {
      subCategory: 'subCategory1'
    }

    // Create Firestore DB Instance (collection)
    const dbInstance = collection(this.firestore, 'categories');

    // Add the new data to the collection => To Firestore DB
    addDoc(dbInstance, categoryData)
    .then((docRef) => {
      console.log(docRef);

      // Add doc to sub-collection
      addDoc(collection(this.firestore, `categories/${docRef.id}/subCategories`), subCategoryData)
      .then((docRef1) => {
        console.log(docRef1);
      })
      .catch(err => console.log(err));
    })
    .catch(err => {
      console.log(err);
    });
  }

}
