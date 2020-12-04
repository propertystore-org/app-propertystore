import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/models';
import { HomeShopService } from 'src/services/home-shop.service';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss']
})
export class ProductSectionComponent implements OnInit {
  @Input() selectedCategory: Category;
  categories: Category[];

  constructor(
    private router: Router,
    private homeShopService: HomeShopService,

  ) { }

  ngOnInit() {


  }

  selectCategory(category: Category) {
    if (category) {
      this.homeShopService.updateCategoryState(category);
      this.router.navigate(['collections', category.Name.toLocaleLowerCase()]);
    }
  }

}
