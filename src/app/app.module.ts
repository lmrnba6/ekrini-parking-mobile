import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Items } from '../mocks/providers/items';
import { Settings, User, Api } from '../providers';
import { MyApp } from './app.component';
import {Diagnostic} from "@ionic-native/diagnostic";
import {BatteryStatus} from "@ionic-native/battery-status";
import {Sim} from "@ionic-native/sim";
import {Network} from "@ionic-native/network";
import {IsDebug} from "@ionic-native/is-debug";
import {AppVersion} from "@ionic-native/app-version";
import {Device} from "@ionic-native/device";
import {EndpointService} from "../providers";
import {LogService} from "../providers";
import {ConnectionStatusService} from "../providers";
import {DeviceInfoService} from "../providers";
import {DeviceInfo} from "../models/information/device-info.model";
import {AuthenticationService} from "../providers";
import {TripService} from "../providers";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtTokenInterceptor} from "../_helpers/jwt.interceptor";
import {UnauthorizedInterceptor} from "../_helpers/error.interceptor";
import {WeatherProvider} from "../providers";
import {Geolocation} from "@ionic-native/geolocation";
import {SettingsPageModule} from "../pages/settings/settings.module";
import {MenuPageModule} from "../pages/menu/menu.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ParkingService} from "../providers/parking.service";
import { Keyboard } from '@ionic-native/keyboard';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot(),
    SettingsPageModule,
    MenuPageModule,
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    Camera,
    SplashScreen,
    StatusBar,
    Diagnostic,
    BatteryStatus,
    Sim,
    Network,
    IsDebug,
    AppVersion,
    Device,
    EndpointService,
    LogService,
    ConnectionStatusService,
    DeviceInfoService,
    DeviceInfo,
    AuthenticationService,
    TripService,
    WeatherProvider,
    Keyboard,
    Geolocation,
    ParkingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
