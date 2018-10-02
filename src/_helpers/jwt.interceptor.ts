import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable, Injector} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {LoadingController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {EndpointService} from "../providers/index";
import {AuthenticationService} from "../providers/index";


@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, public loadingCtrl: LoadingController) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loader = this.loadingCtrl.create({
      content: this.injector.get(TranslateService).instant('Please wait...')
    });
    //loader.present();
    let endpointService = this.injector.get(EndpointService);
    if (req.url.startsWith(endpointService.currentEndpoint) && (req.url.includes('/mobile/v1') || req.url.includes('/file/'))) {
      let token = this.injector.get(AuthenticationService).getToken();
      if (token) {
        //loader.dismiss();
        return next.handle(req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)}));
      } else {
        //loader.dismiss();
        return next.handle(req);
      }
    } else {
      //loader.dismiss();
      return next.handle(req);
    }
  }
}
