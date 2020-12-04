import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, LocaleProductsModel, Product } from 'src/models';
import { LocaleDataService } from 'src/services';
import { HomeShopService } from 'src/services/home-shop.service';

@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.scss']
})
export class HomeLandingComponent implements OnInit {
  localeProducts: LocaleProductsModel[] = [];
  selectedCategory: Category;
  currentNav: string;
  categories: Category[];
  constructor(
    private localeDataService: LocaleDataService,
    private homeShopService: HomeShopService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.localeDataService.getLocaleProducts().subscribe(data => {
      this.localeProducts = data;
    });

    this.homeShopService.getForShop().subscribe(data => {
      this.categories = data || [];
      this.homeShopService.updateCategoryListState(this.categories);
      this.displayProducts(this.categories[0].CategoryId);

    });
  }
  onNavItemClicked(categoryId: string) {
    this.displayProducts(categoryId);
  }

  displayProducts(categoryId: string) {
    this.selectedCategory = this.categories.find(x => x.CategoryId === categoryId);
  }

}
