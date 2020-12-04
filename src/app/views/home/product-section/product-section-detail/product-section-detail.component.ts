import { ProductService } from 'src/services';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Category, Product } from 'src/models';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeShopService } from 'src/services/home-shop.service';
import { ProductVariation } from 'src/models/product.variation.model';
import { of } from 'rxjs';
import { ProductVariationOption } from 'src/models/product.variation.option.model';

@Component({
  selector: 'app-product-section-detail',
  templateUrl: './product-section-detail.component.html',
  styleUrls: ['./product-section-detail.component.scss']
})
export class ProductSectionDetailComponent implements OnInit, OnChanges {
  product: Product;
  productSlug: string;
  totalPrice = 0;
  quantity = 0;
  showModal: boolean;
  modalHeading: string;
  orderProducts: Product[];
  categories: Category[];
  sizes: ProductVariation;
  colors: ProductVariation;

  constructor(
    private activatedRoute: ActivatedRoute,
    private homeShopService: HomeShopService,
    private router: Router,


  ) {
    this.activatedRoute.params.subscribe(r => {
      this.productSlug = r.id;
    });
  }

  ngOnInit() {
    this.product = this.homeShopService.getCurrentProductValue;
    if (this.product) {
      this.sizes = this.product.ProductVariations && this.product.ProductVariations.find(x => x.VariationName === 'Size');
      this.colors = this.product.ProductVariations && this.product.ProductVariations.find(x => x.VariationName === 'Color');
    }
    this.categories = this.homeShopService.getCurrentCategoryListValue;

    // this.updateTotalPrice(this.product.Quantity);
  }

  ngOnChanges() {
    this.updateTotalPrice(this.quantity);
  }
  updateTotalPrice(quantity) {
    if (!quantity) {
      quantity = 1;
    }
    this.quantity = quantity;
    this.totalPrice = this.product.RegularPrice * quantity;
  }
  addCart(product: Product) {
    const adding = this.homeShopService.addToCart(product);
    if (adding.added) {
      this.showModal = true;
      this.orderProducts = adding.orderProducts;
      this.modalHeading = 'Added to cart successfully';
    }
  }

  closeModal() {
    this.showModal = false;
  }
  continueShopping() {
    this.router.navigate(['']);
  }
  checkout() {
    alert('Comming soon!')
    this.router.navigate(['']);
  }

  onNavItemClicked(event) { }
  selectColor(option){
    console.log(option);
    
  }
}
