import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {TripsPage} from "./trips";

@NgModule({
  declarations: [
    TripsPage,
  ],
  imports: [
    IonicPageModule.forChild(TripsPage),
    TranslateModule.forChild()
  ],
  exports: [
    TripsPage
  ]
})
export class TripsPageModule { }
