import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/models/order.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { OrderService } from 'src/services/order.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  user: User;
  modalHeading = 'Add Order';
  showModal: boolean;
  showAddCustomer: boolean;
  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.orders$ = this.orderService.OrderListObservable;
    this.orderService.getOrders(this.user.CompanyId);
  }
  view(order: Order) {
    this.orderService.updateOrderState(order);
    this.router.navigate(['dashboard/order', order.OrdersId]);
  }
  closeModal() {
    this.showModal = false;
    this.showAddCustomer = false;
  }
add(){
  this.router.navigate(['dashboard/create-order']);
}
}
