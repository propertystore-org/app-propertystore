import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, User } from 'src/models';
import { AccountService, CompanyCategoryService } from 'src/services';

@Component({
  selector: 'app-super-categories',
  templateUrl: './super-categories.component.html',
  styleUrls: ['./super-categories.component.scss']
})
export class SuperCategoriesComponent implements OnInit {
  categories: Category[] = [];
  allCategories: Category[] = [];
  category: Category;
  addEditCategory: Category;
  isAll = true;
  isCat;
  isSub;
  user: User;
  heading: string;
  index = 0;
  ctaCreate: string;
  showModal: boolean;
  showActive = true;
  modalHeading = 'Add new parent category';
  constructor(
    private accountService: AccountService,
    private companyCategoryService: CompanyCategoryService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.companyCategoryService.getSystemCategories('Fashion', 'All');
    this.companyCategoryService.systemCategoryListObservable.subscribe(data => {
      if (data && data.length) {
        this.allCategories = data;
        this.categories = this.allCategories.filter(x => Number(x.StatusId) === 1);
        this.categories.map(x => x.IsSelected = false);
        this.category = this.categories.filter(x => x.CategoryType === 'Parent')[this.index];
        this.ctaCreate = `Add ${this.category.Name} Category`;
        this.categories.filter(x => x.CategoryType === 'Parent')[this.index].IsSelected = true;
        this.heading = `All categories (${this.categories.length})`;

      }
    });
  }
  view(category: Category, index) {
    if (category && category.CategoryId) {
      this.index = index;
      this.categories.map(x => x.IsSelected = false);
      this.categories[this.index].IsSelected = true;
      this.category = this.categories[this.index];
      this.ctaCreate = `Add ${category.Name} Category`;
      // this.loadNewOption(this.categories[this.index]);
    }

  }

  edit(category: Category) {
    this.companyCategoryService.getCategory(category.CategoryId).subscribe(data => {
      if (data && data.CategoryId) {
        this.companyCategoryService.updateCategoryState(data);
        this.router.navigate(['dashboard/super-category', category.CategoryId]);
      }
    });
  }
  add() {
    this.router.navigate(['dashboard/customer', 'add']);
  }

  closeModal() {
    this.showModal = false;
  }
  onAddEditCategory(category: any) {
    if (category.CategoryId) {
      this.addEditCategory = category;
      this.showModal = true;
      return;
    }

    if (category === 'parent') {
      this.addEditCategory = {
        CategoryId: '',
        Name: '',
        ParentId: '',
        Description: '',
        CategoryType: 'Parent',
        CompanyType: 'Fashion',
        ImageUrl: '',
        IsDeleted: false,
        CreateUserId: this.user.UserId,
        ModifyUserId: this.user.UserId,
        StatusId: 1,
        Children: []
      };
      this.showModal = true;
      return;
    }

    if (category === 'child') {
      this.addEditCategory = {
        CategoryId: '',
        Name: '',
        ParentId: this.category.CategoryId,
        Description: '',
        CategoryType: 'Child',
        CompanyType: 'Fashion',
        ImageUrl: '',
        IsDeleted: false,
        CreateUserId: this.user.UserId,
        ModifyUserId: this.user.UserId,
        StatusId: 1,
        Children: []
      };
      this.modalHeading = `Adding new   "${this.category.Name}"  Category`;
      this.showModal = true;
      return;
    }

  }

  filter() {
    this.showActive = !this.showActive;
    if (this.showActive) {
      this.categories = this.allCategories.filter(x => Number(x.StatusId) === 1);
      return;
    }
    this.categories = this.allCategories;
  }

}
