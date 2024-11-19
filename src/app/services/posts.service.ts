import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  cloudName = "de3clglcb"; 
  uploadPreset = "dev-blog-uploads";

  constructor(private firestore: Firestore, private toastr: ToastrService, private http: HttpClient) { }

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
    })
    .catch(err => {
      this.toastr.error(err.error, 'ERROR!', {
        timeOut: 5000,
        positionClass: 'toast-top-right'
      } );
    });
  }

}
