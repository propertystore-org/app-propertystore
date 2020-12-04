import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyVariation } from 'src/models';
import { CompanyCategory } from 'src/models/company.category.model';
import { ModalModel } from 'src/models/modal.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { CompanyCategoryService } from 'src/services/companycategory.service';
import { CompanyVariationService } from 'src/services/companyvariation.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  showLoader = true;
  user: User;
  companyCategories: CompanyCategory[];
  companyVariations: CompanyVariation[];
  showModal: boolean;

  modalModel: ModalModel = {
    heading: 'Welcome to Property Store',
    body: [],
    ctaLabel: 'Setup categories',
    routeTo: 'dashboard/set-up-company-categories',
    img: ''
  };
  constructor(
    private accountService: AccountService,
    private companyCategoryService: CompanyCategoryService,
    private companyVariationService: CompanyVariationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.modalModel.img = 'assets/svg/online-shopping.svg';
    this.modalModel.body = [`Hi ${this.user.Name}👋, thank you for joing us.`];
    this.modalModel.body.push(`Ok now let help your customers find what they are looking easy, by seting up products grouping(categories & sub-categories)`);
    this.modalModel.body.push(`We have three main categories (Ladies, Men and Kids), please choose what is relavent to your shop.`);
    this.modalModel.heading = `Welcome to Tybo${this.user.Company.CompanyType}`;
    this.companyCategoryService.getcompanyCategories(this.user.CompanyId);
    this.companyCategoryService.companyCategoryListObservable.subscribe(data => {
      this.companyCategories = data;
      if (!this.companyCategories.length) {
        this.showModal = true;
        // this.router.navigate(['dashboard/set-up-company-categories']);
      } else {
        this.getCompanyVariations();
      }
      this.showLoader = false;
    });

  }

  getCompanyVariations() {
    this.companyVariationService.getCompanyVariations(this.user.CompanyId);
    this.companyVariationService.companyVariationListObservable.subscribe(data => {
      this.companyVariations = data;
      if (!this.companyVariations.length) {
        this.showModal = true;
        this.modalModel.routeTo = 'dashboard/set-up-company-variations';
        this.modalModel.body = ['One more step before adding your first product.'];
        this.modalModel.body.push('In Fashion we can have a lot of varitions (sizes & colours)!');
        this.modalModel.body.push('Please choose what is relavant to your shop.');
        this.modalModel.ctaLabel = 'Setup Variations';
        this.modalModel.ctaLabel = 'Setup Variations';
        this.modalModel.heading = `You're almost done🙂`;
      }
      this.showLoader = false;
    });
  }

}
