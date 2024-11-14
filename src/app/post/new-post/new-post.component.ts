import { CommonModule } from '@angular/common';
import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { AngularEditorConfig, AngularEditorModule } from '@wfpena/angular-wysiwyg';
// import { Editor } from '@tiptap/core';
// import StarterKit from '@tiptap/starter-kit';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    AngularEditorModule
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit {

  permalink: string = '';
  imgSrc: any = '..//public/placeholder.jpg';
  selectedImage: any;
  categoryArray: Array<object> = [];
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
  
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.loadData()
    .then(res => {
      this.categoryArray = res;
    });
  }

  onTitleChanged(event: any) {
    const title = event.target.value;
    this.permalink = title.replace(/\s/g, '-');
    //console.log(this.permalink);
  }

  showPreview(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    }

    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
  }

}
