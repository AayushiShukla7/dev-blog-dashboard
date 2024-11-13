import { ResourceLoader } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDocs, onSnapshot, query, updateDoc } from '@angular/fire/firestore';
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

  updateData(id: string, data: object) {
    //console.log('id: ' + id + ' and data: ' + JSON.stringify(data));

    const docInstance = doc(this.firestore, 'categories', id);
    //return updateDoc(docInstance, data);

    updateDoc(docInstance, data).then((docRef) => {
      //console.log(docRef);
      this.toastr.success('Data Updated Successfully!', 'SUCCESS', {
        timeOut: 5000,
        positionClass: 'toast-top-right'
      } );
    })
    .catch(err => {
      this.toastr.error(err.error, 'ERROR!', {
        timeOut: 5000,
        positionClass: 'toast-top-right'
      } );
    });
  }

  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'categories', id);
    deleteDoc(docInstance).then((docRef) => {
      //console.log(docRef);
      this.toastr.success('Data Deleted Successfully!', 'SUCCESS', {
        timeOut: 5000,
        positionClass: 'toast-top-right'
      } );
    })
    .catch(err => {
      this.toastr.error(err.error, 'ERROR!', {
        timeOut: 5000,
        positionClass: 'toast-top-right'
      } );
    });
  }

}
