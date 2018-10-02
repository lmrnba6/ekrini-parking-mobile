import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ItemCreatePage } from './item-create';

@NgModule({
  declarations: [
    ItemCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCreatePage),
    TranslateModule.forChild(),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCZZK9VEOt_YdWrn0SO91YRpb--LcqffKA",
      authDomain: "ekrini-c00a2.firebaseapp.com",
      storageBucket: "gs://ekrini-c00a2.appspot.com",
      projectId: "ekrini-c00a2",
    }),
    AngularFireStorageModule
  ],
  exports: [
    ItemCreatePage
  ]
})
export class ItemCreatePageModule { }
