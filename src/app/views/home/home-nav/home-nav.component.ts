import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category, NavigationModel } from 'src/models';
import { HomeShopService } from 'src/services/home-shop.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent implements OnInit {

  @Input() showNav: boolean;
  @Input() categories: Category[];
  @Output() navAction: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selectedItem: EventEmitter<string> = new EventEmitter<string>();

  navItems: NavigationModel[] = [];
  toolbarItems: NavigationModel[];

  constructor(
    private homeShopService: HomeShopService,
    private navigationService: NavigationService,

  ) {

  }

  ngOnInit() {
    if (this.categories) {
      this.categories.forEach(item => {
        this.navItems.push({
          Id: item.CategoryId,
          Label: item.Name,
          Url: '',
          ImageUrl: '',
          Tooltip: '',
          Class: '',
        });
      });
      this.navItems[0].Class = 'active';
    }
    this.navigationService.getToolbarNavigation().subscribe(data => {
      if (data.length > 0) {
        this.toolbarItems = data;
      }
    });
  }

  actionClick() {
    this.navAction.emit(true);
  }

  navItemClicked(item: NavigationModel) {
    if (item) {
      this.navItems.map(x => x.Class = '');
      item.Class = 'active';
      this.selectedItem.emit(item.Id);
    }

  }
}
