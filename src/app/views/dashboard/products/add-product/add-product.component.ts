import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Category, CompanyCategory, Product, User } from 'src/models';
import { AccountService, CompanyCategoryService, ProductService, UploadService } from 'src/services';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  showLoader;
  @Input() existingProduct: Product;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() addingProductFinished: EventEmitter<Product> = new EventEmitter();

  product: Product = {
    ProductId: '',
    CompanyId: '',
    Name: '',
    RegularPrice: 0,
    PriceFrom: 0,
    PriceTo: 0,
    Description: '',
    ProductSlug: '',
    CatergoryId: 0,
    ParentCategoryId: 0,
    CategoryName: '',
    ParentCategoryName: '',
    ParentCategoryGuid: '',
    CategoryGuid: '',
    FeaturedImageUrl: '',
    IsJustInTime: 0,
    SupplierId: '',
    ProductType: '',
    Code: '',
    CreateDate: '',
    CreateUserId: '',
    ModifyDate: '',
    ModifyUserId: '',
    StatusId: 1,
  };

  editorStyle = {
    height: '180px',
    marginBottom: '30px',
  };
  user: User;
  parentCategories: Category[];
  chilndrenCategories: Category[];
  categories: Category[];


  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      // ['image']
    ]
  };
  constructor(
    private router: Router,
    private productService: ProductService,
    private accountService: AccountService,
    private companyCategoryService: CompanyCategoryService,
    private uploadService: UploadService,


  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    if (this.existingProduct.ProductId) {
      this.product = this.existingProduct;
    }
    else {
      this.product.CompanyId = this.user.CompanyId;
      this.product.CreateUserId = this.user.CompanyId;
      this.product.ModifyUserId = this.user.CompanyId;
      this.productService.getProducts(this.user.CompanyId);

      this.productService.productListObservable.subscribe(data => {
        if (data) {
          this.product.Code = `P00${data.length + 1}`;
        }
      });
    }


    this.companyCategoryService.getSystemCategories(this.user.CompanyId, 'All');
    this.companyCategoryService.systemCategoryListObservable.subscribe(data => {
      if (data && data.length) {
        this.categories = data;
        this.parentCategories = this.categories.filter(x => x.CategoryType === 'Parent' && Number(x.StatusId) === 1);
        this.parentCategories.map(x => x.IsSelected = false);
        if (this.product && this.product.ProductId) {
          this.selectCategory(this.product.ParentCategoryGuid);
        }
      }
    });
  }
  saveProduct() {
    this.product.ProductSlug = this.productService.generateSlug(this.user.Company.Name, this.product.Name, this.product.Code);
    if (this.product.ParentCategoryGuid) {
      this.product.ParentCategoryName = this.categories.find(x => x.CategoryId === this.product.ParentCategoryGuid).Name;
    }
    if (this.product.CategoryGuid) {
      this.product.CategoryName = this.categories.find(x => x.CategoryId === this.product.CategoryGuid).Name;
    }
    if (this.product.ProductId && this.product.CreateDate) {
      this.productService.update(this.product).subscribe(data => {
        if (data) {
          this.addingProductFinished.emit(data);
        }
      });
    } else {
      this.productService.add(this.product).subscribe(data => {
        if (data) {
          this.product = data;
          this.addingProductFinished.emit(data);

        }
      });
    }

  }
  back() {
    this.router.navigate([`/dashboard/properties`]);
  }
  selectCategory(categoryId: string) {
    if (categoryId && categoryId.length) {
      if (categoryId.split(':').length === 2) {
        categoryId = categoryId.split(':')[1].trim();
      }
      this.chilndrenCategories = this.categories.filter(x => x.ParentId === categoryId && Number(x.StatusId) === 1);
    }
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
        this.product.FeaturedImageUrl = `${environment.API_URL}/api/upload/${url}`;
      });

    });




  }
}
