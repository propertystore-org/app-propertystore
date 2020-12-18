import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { ProductService } from 'src/services/product.service';
import { UserService } from 'src/services/user.service';
import {CUSTOMER} from '../../../../../shared/constants';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  user: User;
  modalHeading = 'Add product';
  showModal: boolean;
  showAddCustomer: boolean;

  contacts: User[] = [];
  contact: User;
  constructor(
    private productService: ProductService,
    private accountService: AccountService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.products$ = this.productService.productListObservable;
    this.productService.getProducts(this.user.CompanyId);

    this.contact = this.accountService.currentUserValue;
    this.userService.userListObservable.subscribe(data => {
      this.contacts = data;
    });
    this.userService.getUsers(this.contact.CompanyId, CUSTOMER);
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


  viewContacts(contact: User) {
    this.userService.updateUserState(contact);
    this.router.navigate(['dashboard/customer', contact.UserId]);
  }
  addContacts() {
    this.router.navigate(['dashboard/customer', 'add']);
  }

}
