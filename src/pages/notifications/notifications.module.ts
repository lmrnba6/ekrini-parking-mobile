import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {NotificationsPage} from "./notifications";

@NgModule({
  declarations: [
    NotificationsPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationsPage),
    TranslateModule.forChild()
  ],
  exports: [
    NotificationsPage
  ]
})
export class NotificationsPageModule { }
