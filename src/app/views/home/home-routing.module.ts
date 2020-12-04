import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent, ResetPasswordComponent } from 'src/app/account/forgot-password';
import { SignInComponent } from 'src/app/account/sign-in';
import { SignUpComponent } from 'src/app/account/sign-up';
import { CartComponent, CheckoutComponent } from './cart';
import { FiitingRoomComponent } from './fiiting-room/fiiting-room.component';
import { HomeLandingComponent } from './home-landing';
import { HomeNavComponent } from './home-nav';
import { HomeToolbarNavigationComponent } from './home-toolbar-navigation/home-toolbar-navigation.component';
import { HomeComponent } from './home.component';
import { ProductSectionCardComponent, ProductSectionComponent, ProductSectionDetailComponent } from './product-section';
import { CollectionsComponent } from './product-section/collections/collections.component';
import { ShopComponent } from './shop';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      // { path: '', component: HomeLandingComponent },
      { path: '', component: SignInComponent },
      // { path: '', component: FiitingRoomComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'fitting-room', component: FiitingRoomComponent },
      { path: 'product-details/:id', component: ProductSectionDetailComponent },
      { path: 'collections/:id', component: CollectionsComponent },

    ]

  }
];

export const declarations = [
  SignInComponent,
  SignUpComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  HomeComponent,
  HomeLandingComponent,
  HomeNavComponent,
  ShopComponent,
  ProductSectionComponent,
  ProductSectionDetailComponent,
  FiitingRoomComponent,
  ProductSectionCardComponent,
  HomeToolbarNavigationComponent,
  CartComponent,
  CheckoutComponent,
  CollectionsComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
