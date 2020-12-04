import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from 'src/models/category.model';
import { UploadService, CompanyCategoryService } from 'src/services';

@Component({
  selector: 'app-super-add-adit-category',
  templateUrl: './super-add-adit-category.component.html',
  styleUrls: ['./super-add-adit-category.component.scss']
})
export class SuperAddAditCategoryComponent implements OnInit {
  @Input() category: Category;
  // <app-super-add-adit-category [category]="category">

  showLoader;
  constructor(
    private uploadService: UploadService,
    private categoryService: CompanyCategoryService,
  ) { }

  ngOnInit() {
  }

  public uploadFile = (files: FileList) => {
    if (files.length === 0) {
      return;
    }

    Array.from(files).forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', `tybo.${file.name.split('.')[file.name.split('.').length - 1]}`); // file extention
      this.uploadService.uploadFile(formData).subscribe(url => {
        this.category.ImageUrl = `${environment.API_URL}/api/upload/${url}`;
      });

    });
  }

  save() {
    if (this.category.CategoryId && this.category.CategoryId.length > 5) {
      this.categoryService.update(this.category).subscribe(data => {

      })
    }
    else {
      this.categoryService.add(this.category).subscribe(data => {
        console.log(data);
      });
    }
  }

}
