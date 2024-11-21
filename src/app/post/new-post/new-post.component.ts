import { CommonModule } from '@angular/common';
import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { AngularEditorConfig, AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    AngularEditorModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit {

  permalink: string = '';
  imgSrc: any = '..//public/placeholder.jpg';
  selectedImage: any;
  categoryArray: Array<any> = [];
  htmlContent: any;
  
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  postForm: FormGroup = new FormGroup({});
  //pl: FormControl = new FormControl({value: '', disabled: true});
  post: any;
  formStatus: string = 'Add New';
  postId: any;
  
  constructor(
    private categoriesService: CategoriesService, 
    private fb: FormBuilder, 
    private postsService: PostsService,
    private route: ActivatedRoute
  ) 
  {   
    // Capture the query parameter
    this.route.queryParams.subscribe((val: any) => {
      this.postId = val.id;

      // For Edit Action
      if(this.postId) {
        this.postsService.loadSingleDocData(val.id).subscribe((post: any) => {
          //console.log(post);        
          this.post = post;        
  
          // Reactive Form + Validations        
          var pl = new FormControl({value: this.post.permalink, disabled: true});
          pl.addValidators(Validators.required);
  
          this.postForm = this.fb.group({
            title: [this.post.title, [Validators.required, Validators.minLength(10)]],
            permalink: pl,
            excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(50)]],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
            postImage: ['', Validators.required],
            content: [this.post.content, Validators.required]
          });
  
          //this.postForm.patchValue({ permalink: this.post.permalink });
          this.imgSrc = this.post.postImagePath;  // Load Image  
          this.formStatus = 'Edit';
        });
      }
      else {
        // Reactive Form + Validations        
        var pl = new FormControl({value: '', disabled: true});
        pl.addValidators(Validators.required);

        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: pl,
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postImage: ['', Validators.required],
          content: ['', Validators.required]
        });

      }
      
    });   
    
  }

  ngOnInit(): void {
    this.categoriesService.loadData()
    .then(res => {
      this.categoryArray = res;
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChanged(event: any) {
    const title = event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    }

    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
  }

  onSubmit() {
    //console.log(this.postForm.value);

    let splitCategoryData = this.postForm.value.category.split('-');    

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.permalink,
      category: {
        categoryId: splitCategoryData[0],
        category: splitCategoryData[1]
      },
      postImagePath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    };

    this.postsService.uploadImage(this.selectedImage, postData, this.formStatus, this.postId);
    
    this.postForm.reset();
    this.imgSrc = '..//public/placeholder.jpg';
  }

}
