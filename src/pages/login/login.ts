import {AlertController, LoadingController, MenuController, NavController, ToastController} from "ionic-angular";
import {IonicPage} from "ionic-angular";
import {RegisterPage} from "../index";
import {SearchPage} from "../index";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ConnectionStatus} from "../../models/information/connection-status.model";
import {Subject} from "rxjs";
import {ConnectionStatusService, LogService} from "../../providers/index";
import {AuthenticationService} from "../../providers/index";
import {animate, Component, keyframes, state, style, transition, trigger} from '@angular/core';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class LoginPage {

  public loginForm : FormGroup;
  private connectionStatus: ConnectionStatus = new ConnectionStatus();
  private unsubscribe: Subject<void> = new Subject<void>();
  connectionErrorMessage: boolean;
  error: boolean;
  lang: string;

  constructor(private connectionStatusService: ConnectionStatusService,
              private authenticationService: AuthenticationService,
              public formBuilder: FormBuilder,
              private translate: TranslateService,
              public nav: NavController,
              public alertCtrl: AlertController,
              public menu: MenuController,
              public toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private log: LogService) {
    this.lang = this.translate.currentLang;
    this.lang && this.translate.use(this.lang);
    this.menu.swipeEnable(false);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    if (!this.authenticationService.isTokenExpired()) {
      this.nav.setRoot(SearchPage);
    }
    this.connectionStatusService.connectionStatusSubscription
      .takeUntil(this.unsubscribe)
      .subscribe((next) => {
        this.connectionStatus = next;
        if (!this.connectionStatus.isConnected) {
          this.connectionErrorMessage = true;
        } else {
          this.connectionErrorMessage = false;
        }
      });
  }

  changeLanguage() {
    let alert = this.alertCtrl.create();
    alert.setTitle(this.translate.instant('languages.title'));
    alert.addInput({
      type: 'radio',
      label: this.translate.instant('languages.french'),
      value: 'fr',
      checked: this.lang === 'fr'
    });
    alert.addInput({
      type: 'radio',
      label: this.translate.instant('languages.english'),
      value: 'en',
      checked: this.lang === 'en'
    });
    alert.addButton(this.translate.instant('buttons.cancel'));
    alert.addButton({
      text: this.translate.instant('buttons.ok'),
      handler: (data: any) => {
        this.translate.use(data);
        this.lang = data;
      }
    });
    alert.present();
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    const loading = this.loadingCtrl.create();
    loading.present();
    const loginForm = (this.loginForm as any);
    this.authenticationService.login(loginForm.value.email, loginForm.value.password)
      .subscribe(
        data => {
          loading.dismiss();
          this.error = false;
          this.nav.setRoot(SearchPage);
        },
        error => {
          loading.dismiss();
          console.log(error);
          this.error = true;
        });
  }

  forgotPass() {
    let forgot = this.alertCtrl.create({
      title: this.translate.instant('pages.login.forgot_password') + '?',
      message: this.translate.instant('pages.login.forgot_password_text'),
      inputs: [
        {
          name: 'email',
          placeholder: this.translate.instant('pages.login.email'),
          type: 'email'
        },
      ],
      buttons: [
        {
          text: this.translate.instant('buttons.cancel'),
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.instant('buttons.send'),
          handler: data => {
            let toast = this.toastCtrl.create({
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            const loading = this.loadingCtrl.create();
            const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(regex.test(data.email)) {
              loading.present();
              this.authenticationService.forgotPassword(data.email).subscribe(() => {
                toast.setMessage(this.translate.instant('pages.login.email_sent_success'));
                loading.dismiss();
                toast.present();
              }, err => {
                toast.setMessage(this.translate.instant('pages.login.email_sent_error'));
                loading.dismiss();
                toast.present();
                this.log.error('Email unsent', err);
              });
            } else {
              toast.setMessage(this.translate.instant('messages.invalid_email'));
              toast.present();
              return false;
            }
          }
        }
      ]
    });
    forgot.present();
  }

}
