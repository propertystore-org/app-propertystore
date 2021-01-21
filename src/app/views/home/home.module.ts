import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule, declarations } from './home-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { MaterialModule } from 'src/app/material';
// import { PrimeNgModule } from 'src/app/primeng';
// import { QuillModule } from 'ngx-quill';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {DashboardModule} from "../dashboard/dashboard.module";
import {MatSliderModule} from "@angular/material/slider";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatIconModule,
        MatTabsModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        DashboardModule,
        MatSliderModule,

        // QuillModule.forRoot()

    ],
  declarations: [...declarations]
})
export class HomeModule { }
