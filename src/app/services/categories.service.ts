import { ResourceLoader } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, getDocs, onSnapshot, query } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService { 

  constructor(private firestore: Firestore, private toastr: ToastrService) { }

  saveData(data:any) {
    // Create Firestore DB Instance (collection)
    const dbInstance = collection(this.firestore, 'categories');

    // Add the new data to the collection => To Firestore DB
    addDoc(dbInstance, data)
    .then((docRef) => {
      //console.log(docRef);
      this.toastr.success('Data Saved Successfully!', 'SUCCESS', {
        timeOut: 5000,
        positionClass: 'toast-top-right'
      } );

      // // Add doc to sub-collection
      // let subCategoryData = {
      //   subCategory: 'subCategory1'
      // }
      // addDoc(collection(this.firestore, `categories/${docRef.id}/subCategories`), subCategoryData)
      // .then((docRef1) => {
      //   console.log(docRef1);
      // })
      // .catch(err => console.log(err));
    })
    .catch(err => {
      this.toastr.error(err.error, 'ERROR!', {
        timeOut: 5000,
        positionClass: 'toast-top-right'
      } );
    });
  }

  async loadData() {
    var result: Array<any> = [{}];
    const dbInstance = collection(this.firestore, 'categories');
    //return collectionData(dbInstance, { idField: 'id' });

    const q = query(dbInstance);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      result.push({ 'id': doc.id, 'data': doc.data()});
    });

    result.splice(0,1);

    return result;
  }
}
