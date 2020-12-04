import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Product } from 'src/models';
import { HomeShopService } from 'src/services/home-shop.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  product: Product;
  productSlug: string;
  totalPrice = 0;
  quantity = 0;
  catergoryId: string;
  catergory: Category;
  categories: Category[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private homeShopService: HomeShopService,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.catergoryId = r.id;
    });
  }

  ngOnInit() {
    this.catergory = this.homeShopService.getCurrentCategoryValue;
    this.categories = this.homeShopService.getCurrentCategoryListValue;
  }


  updateTotalPrice(quantity) {
    if (!quantity) {
      quantity = 1;
    }
    this.quantity = quantity;
  }
  onNavItemClicked(p) { }
}
