import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CompanyCategory } from 'src/models/company.category.model';
import { Category } from 'src/models/category.model';
import { Product } from 'src/models';


@Injectable({
  providedIn: 'root'
})
export class HomeShopService {



  private categoryListBehaviorSubject: BehaviorSubject<Category[]>;
  public categoryListObservable: Observable<Category[]>;

  private categoryBehaviorSubject: BehaviorSubject<Category>;
  public categoryObservable: Observable<Category>;

  private productBehaviorSubject: BehaviorSubject<Product>;
  public productObservable: Observable<Product>;


  url: string;
  orderProducts: Product[] = [];

  constructor(
    private http: HttpClient
  ) {

    this.categoryListBehaviorSubject =
      new BehaviorSubject<Category[]>(JSON.parse(localStorage.getItem('shopCategorysList')));
    this.categoryListObservable = this.categoryListBehaviorSubject.asObservable();

    this.categoryBehaviorSubject =
      new BehaviorSubject<Category>(JSON.parse(localStorage.getItem('shopCategory')));
    this.categoryObservable = this.categoryBehaviorSubject.asObservable();

    this.productBehaviorSubject =
      new BehaviorSubject<Product>(JSON.parse(localStorage.getItem('shopProduct')));
    this.productObservable = this.productBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }
  public get getCurrentCategoryListValue() {
    return this.categoryListBehaviorSubject.value;
  }
  public get getCurrentCategoryValue() {
    return this.categoryBehaviorSubject.value;
  }
  public get getCurrentProductValue() {
    return this.productBehaviorSubject.value;
  }


  updateCategoryListState(category: Category[]) {
    this.categoryListBehaviorSubject.next(category);
    localStorage.setItem('shopCategorysList', JSON.stringify(category));
  }
  updateCategoryState(category: Category) {
    this.categoryBehaviorSubject.next(category);
    localStorage.setItem('shopCategory', JSON.stringify(category));
  }
  updateProductState(product: Product) {
    this.productBehaviorSubject.next(product);
    localStorage.setItem('shopProduct', JSON.stringify(product));
  }
  getForShop() {
    return this.http.get<Category[]>(
      `${this.url}/api/categories/list-for-a-shop.php`
    );
  }

  addToCart(product: Product) {
    this.orderProducts.push(product);
    return {
      added: true,
      orderProducts: this.orderProducts
    }
  }


}
