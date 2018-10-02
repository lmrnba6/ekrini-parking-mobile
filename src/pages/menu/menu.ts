import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav } from 'ionic-angular';
import {LoginPage} from "../index";
import {AuthenticationService} from "../../providers";
import {Events} from "ionic-angular";


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  constructor(private authService: AuthenticationService, private events: Events){
  }

  openPage(page) {
    this.events.publish('navigate', page);
  }

  logout() {
    this.authService.logout();
    this.events.publish('navigate', LoginPage);
  }
}
