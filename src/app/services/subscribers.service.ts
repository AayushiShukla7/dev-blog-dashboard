import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, Firestore, getDocs, query } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private firestore: Firestore, private toastr: ToastrService) { }

  async loadData() {
    var result: Array<any> = [{}];
    const dbInstance = collection(this.firestore, 'subscribers');

    const q = query(dbInstance);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      result.push({ 'id': doc.id, 'data': doc.data()});
    });

    result.splice(0,1);

    return result;
  }

  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'subscribers', id);

    deleteDoc(docInstance).then((docRef) => {
      //console.log(docRef);
      this.toastr.success('Subscriber Deleted Successfully!', 'SUCCESS', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      } );
    })
    .catch(err => {
      this.toastr.error(err.error, 'ERROR!', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      } );
    });
  }  

}
