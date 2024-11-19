import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, collection, doc, docData, Firestore, getDocs, query } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  cloudName = "de3clglcb"; 
  uploadPreset = "dev-blog-uploads";

  constructor(
    private firestore: Firestore, 
    private toastr: ToastrService, 
    private http: HttpClient,
    private router: Router
  ) { }

  // Cloudinary - Image Upload

  uploadImage(file: any, postData: any) {
    const formData = new FormData();
    let imageUrl = '';
    let url = 'https://api.cloudinary.com/v1_1/'+ this.cloudName + '/image/upload';

    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    formData.append('cloud_name', this.cloudName);
    formData.append('public_id', Date.now().toString());

    this.http.post(url,formData).subscribe((imageData: any) => {
      //console.log(imageData);
      imageUrl = imageData.url;
      postData.postImagePath = imageUrl;

      this.saveData(postData);
    });
  }

  saveData(postData: any) {
    // Create Firestore DB Instance (collection)
    const dbInstance = collection(this.firestore, 'posts');

    // Add the new data to the collection => To Firestore DB
    addDoc(dbInstance, postData)
    .then((docRef) => {
      this.toastr.success('Data Inserted Successfully!', 'SUCCESS', {
        timeOut: 5000,
        positionClass: 'toast-top-right'
      } );

      this.router.navigateByUrl('/posts');
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
    const dbInstance = collection(this.firestore, 'posts');

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

  loadSingleDocData(id: any) {
    const docInstance = doc(this.firestore, 'posts', id);
    return docData(docInstance).pipe(take(1));
  }

}
