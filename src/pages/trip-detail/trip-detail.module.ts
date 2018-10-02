import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {TripDetailPage} from "./trip-detail";

@NgModule({
  declarations: [
    TripDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TripDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    TripDetailPage
  ]
})
export class TripDetailPageModule { }
