import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {SearchLocationPage} from "./search-location";

@NgModule({
  declarations: [
    SearchLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchLocationPage),
    TranslateModule.forChild()
  ],
  exports: [
    SearchLocationPage
  ]
})
export class SearchLocationPageModule { }
