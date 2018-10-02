import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {Events} from "ionic-angular";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/index";
import {DeviceInfoService} from "../providers/index";
import {EndpointService} from "../providers/index";
import {TranslateService} from "@ngx-translate/core";
import { Keyboard } from '@ionic-native/keyboard';


export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private deviceInfoService: DeviceInfoService,
    private endpointService: EndpointService,
    private translateService: TranslateService,
    private events: Events,
    private keyboard: Keyboard
  ) {
    this.initializeApp();
    this.events.subscribe('navigate', page => this.openPage(page))
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      this.deviceInfoService.init()
        .then(() => {
          this.endpointService.init()});
      this.translateService.setDefaultLang('en');
      this.translateService.addLangs(['fr', 'en']);
      this.translateService.use('en');
      //*** Control Keyboard
      //this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    this.nav.setRoot(page);
  }

}
