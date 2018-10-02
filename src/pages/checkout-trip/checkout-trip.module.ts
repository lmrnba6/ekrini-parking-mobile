import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {CheckoutTripPage} from "./checkout-trip";

@NgModule({
  declarations: [
    CheckoutTripPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutTripPage),
    TranslateModule.forChild()
  ],
  exports: [
    CheckoutTripPage
  ]
})
export class CheckoutTripModule { }
