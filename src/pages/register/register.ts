import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../index";
import {IonicPage} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../../providers";
import {trigger} from "@angular/core";
import {state} from "@angular/core";
import {style} from "@angular/core";
import {transition} from "@angular/core";
import {animate} from "@angular/core";
import {keyframes} from "@angular/core";


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
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
export class RegisterPage {

  registerForm : FormGroup;
  error: boolean;
  errorMessage: string;

  constructor(public nav: NavController, public formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.maxLength(40)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
    });
  }

  // register and go to home page
  register() {
    const registerForm = this.registerForm as any;
    this.authenticationService.register(registerForm.value.username, registerForm.value.password, registerForm.value.email, registerForm.value.name)
      .subscribe(
        data => {
          this.error = false;
          this.nav.setRoot(LoginPage);
        },
        error => {
          console.log(error);
          this.error = true;
          this.errorMessage = error.error.message;
        });
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
