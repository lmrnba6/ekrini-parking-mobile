import {Component} from "@angular/core";
import {IonicPage} from "ionic-angular";
import {Events} from "ionic-angular";
import {LoginPage} from "../index";
import {AuthenticationService} from "../../providers/index";
import {TranslateService} from "@ngx-translate/core";
import {OnInit} from "@angular/core";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit{

  lang: string;

  constructor(private authenticationService: AuthenticationService, private events: Events, private translate: TranslateService) {
    this.lang = this.translate.currentLang;
  }



  ngOnInit() {
    this.lang = this.translate.currentLang;
  }

  // logout
  logout() {
    this.authenticationService.logout();
    this.events.publish('navigate', 'LoginPage')
  }

  onLanguageChange(lang: string) {
    this.translate.use(lang);
  }
}
