import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {LocalWeatherPage} from "./local-weather";

@NgModule({
  declarations: [
    LocalWeatherPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalWeatherPage),
    TranslateModule.forChild()
  ],
  exports: [
    LocalWeatherPage
  ]
})
export class LocalWeatherModule { }
