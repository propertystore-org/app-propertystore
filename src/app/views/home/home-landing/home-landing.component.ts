import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category, LocaleProductsModel, Product, User } from 'src/models';
import { AccountService, LocaleDataService, ProductService } from 'src/services';
import { HomeShopService } from 'src/services/home-shop.service';

@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.scss']
})
export class HomeLandingComponent implements OnInit {
  products$: Observable<Product[]>;
  user: User;
  modalHeading = 'Property for Sale in Sandown, Sandton';
  showModal: boolean;
  showAddCustomer: boolean;
  constructor(
    private productService: ProductService,str
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.products$ = this.productService.productListObservable;
    this.productService.getProducts('all');
  }
  view(product: Product) {
    this.productService.updateProductState(product);
    this.router.navigate(['dashboard/product', product.ProductSlug]);
  }
  closeModal() {
    this.showModal = false;
    this.showAddCustomer = false;
  }
  add(){
    // this.router.navigate(['dashboard/add-product']);
    this.productService.updateProductState(null);
    this.router.navigate(['dashboard/product', 'add']);
  }

}
