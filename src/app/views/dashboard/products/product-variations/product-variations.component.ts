import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, CompanyVariation, VariationOption, Product, Variation } from 'src/models';
import { ProductVariation } from 'src/models/product.variation.model';
import { ProductVariationOption } from 'src/models/product.variation.option.model';
import { CompanyVariationService, AccountService, ProductService } from 'src/services';
import { ProductVariationService } from 'src/services/product-variation.service';

@Component({
  selector: 'app-product-variations',
  templateUrl: './product-variations.component.html',
  styleUrls: ['./product-variations.component.scss']
})
export class ProductVariationsComponent implements OnInit {

  variations: Variation[] = [];
  isAll = true;
  isCat;
  isSub;
  user: User;
  heading: string;
  index = 0;
  modalHeading;
  showModal;
  newOption: VariationOption;
  product: Product;
  // varaitions: CompanyVariation[];
  ProductId: string;


  constructor(
    private accountService: AccountService,
    private companyVariationService: CompanyVariationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private productVariationService: ProductVariationService,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.ProductId = r.id;
    });
  }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.product = this.productService.currentProductValue;
    this.productService.getProduct(this.ProductId);
    this.productService.productObservable.subscribe(product => {
      this.product = product;
    });
    this.companyVariationService.getAllVariations('Fashion').subscribe(data => {
      if (data && data.length) {
        this.variations = data;
        this.variations.map(x => x.IsSelected = false);
        this.variations[this.index].IsSelected = true;
        this.heading = `All variations (${this.variations.length})`;
        this.loadNewOption(this.variations[this.index]);
        this.variations.forEach(varitaion => {

          varitaion.VariationsOptions.forEach(option => {
            const existingOption =
              this.product.ProductOVariationOptions.find(x => x.VariationOptionId === option.VariationOptionId);
            if (existingOption) {
              option.IsSelected = true;
              option.Class = ['old'];
              console.log('existingOption', existingOption);

            }
          });
        })
      }
    });
  }

  view(variation: Variation, index) {
    if (variation && variation.VariationId) {
      this.index = index;
      this.variations.map(x => x.IsSelected = false);
      this.variations[this.index].IsSelected = true;
      this.loadNewOption(this.variations[this.index]);
    }

  }
  add(variation?: Variation) {
    this.router.navigate(['dashboard/super-variation-options', variation && variation.VariationId || 'add']);
  }
  edit(item: VariationOption) {

  }
  closeModal() { }
  updateOption(option: VariationOption) {
    this.companyVariationService.updateVariationOption(option).subscribe(data => {
      console.log(data);

    });
  }
  addVariationOption() {
    if (!this.newOption.Name) {
      return false;
    }

    if (this.variations[this.index].Name === 'Color' && !this.newOption.Description) {
      return false;
    }
    this.companyVariationService.addVariationOption(this.newOption).subscribe(data => {
      console.log(data);
      if (data && data.VariationId && this.variations[this.index] && this.variations[this.index].VariationsOptions) {
        this.variations[this.index].VariationsOptions.push(data);
        this.loadNewOption(this.variations[this.index]);
      }

    });
  }

  loadNewOption(variation: Variation) {
    this.newOption = {
      VariationOptionId: 0,
      VariationId: variation.VariationId,
      Name: undefined,
      Description: undefined,
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    };
  }
  // showLoader;
  // user: User;
  // varaitions: CompanyVariation[];
  // variationsOptions: VariationOption[];
  // test;
  // ProductId: any;
  // constructor(
  //   private companyVariationService: CompanyVariationService,
  //   private router: Router,
  //   private accountService: AccountService,
  //   private activatedRoute: ActivatedRoute,
  //   private productService: ProductService,
  //   private productVariationService: ProductVariationService,
  // ) {
  //   this.activatedRoute.params.subscribe(r => {
  //     this.ProductId = r.id;
  //   });
  // }

  // ngOnInit() {
  //   this.user = this.accountService.currentUserValue;
  //   this.product = this.productService.currentProductValue;
  //   this.productService.getProduct(this.ProductId);
  //   this.productService.productObservable.subscribe(product => {
  //     this.product = product;
  //   });

  //   this.companyVariationService.getCompanyVariations(this.user.CompanyId);
  //   this.companyVariationService.companyVariationListObservable.subscribe(data => {
  //     if (data && data.length) {
  //       data.forEach(varaition => {
  //         if (varaition.VariationsOptions) {
  //           varaition.VariationsOptions.forEach(option => {
  //             if (this.product.ProductVariations) {
  //               const existingProductVariation =
  //                 this.product.ProductVariations.find(x => x.CompanyVariationId === varaition.CompanyVariationId);
  //               console.log('existingProductVariation', existingProductVariation);
  //               if (
  //                 existingProductVariation &&
  //                 existingProductVariation.ProductVariationOptions
  //                   .find(x => x.CompanyVariationOptionId === option.Id)
  //               ) {
  //                 option.IsSelected = true;
  //               }

  //             }


  //             // alert(option.Name);
  //           });
  //         }
  //       });
  //     }
  //     this.varaitions = data || [];
  //   });

  // }

  // back() {
  //   this.router.navigate([`/dashboard/properties`]);
  // }

  // selectVariation(variation: VariationOption) {
  //   if (variation) {
  //     variation.IsSelected = !variation.IsSelected;
  //     return true;
  //   }
  // }
  saveProduct() {
    console.log(this.variations.filter(x => x.IsSelected));
    const productVariations: ProductVariation[] = [];
    const productVariationOptions: ProductVariationOption[] = [];
    this.variations.forEach(varaition => {
      if (varaition.VariationsOptions && varaition.VariationsOptions.find(x => x.IsSelected)) {
        productVariations.push({
          ProductId: this.product.ProductId,
          CompanyVariationId: varaition.VariationId,
          VariationName: varaition.Name,
          CreateUserId: this.user.UserId,
          ModifyUserId: this.user.UserId,
          StatusId: 1
        });
      }
      varaition.VariationsOptions.forEach(option => {
        if (option.IsSelected) {
          productVariationOptions.push({
            ProductVariationId: 0,
            ProductId: this.product.ProductId,
            VariationId: varaition.VariationId,
            VariationOptionId: option.VariationOptionId,
            VariationName: varaition.Name,
            Description: option.Description,
            OptionName: option.Name,
            CreateUserId: this.user.UserId,
            ModifyUserId: this.user.UserId,
            StatusId: 1
          });
        }
      });
    });
    if (!productVariations.length) {
      alert('Please at least one product variations to continue');
      return false;
    }
    this.productVariationService.addProductVariationRange(productVariations).subscribe(data => {
      if (data && data.length) {
        productVariationOptions.map(item => {
          item.ProductVariationId = data.find(x => x.CompanyVariationId === item.VariationId).Id;
          return item;
        });
        this.productVariationService.addProductVariationOptionsRange(productVariationOptions).subscribe(res => {
          this.productService.getProductSync(this.product.ProductId).subscribe(response => {
            if (data) {
              this.productService.updateProductState(response);
            }
          });
        });
      }
    });
  }
}
