import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models';
import {AccountService, UserService} from '../../../../services';
import {Router} from '@angular/router';
import {CUSTOMER} from '../../../../shared/constants';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  showModal: boolean;
  showAddCustomer: boolean;

  users: User[] = [];
  modalHeading = 'Add customer';
  user: User;
  constructor(
    private accountService: AccountService,
    private userService: UserService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.userService.userListObservable.subscribe(data => {
      this.users = data;
    });
    this.userService.getUsers(this.user.CompanyId, CUSTOMER);
  }
  closeModal() {
    this.showModal = false;
    this.showAddCustomer = false;
  }
  view(user: User) {
    this.userService.updateUserState(user);
    this.router.navigate(['dashboard/customer', user.UserId]);
  }
  add() {
    this.router.navigate(['dashboard/customer', 'add']);
  }

}
