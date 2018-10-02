import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {LogService} from "./log.service";
import { Platform } from 'ionic-angular';

export const endpoints = {
  'production': 'http://ekrini/mobile/v1',
  'local': 'http://localhost:8080',
  'cordovaLocal': 'http://192.168.1.4:8080'
};


@Injectable()
export class EndpointService {

  private endpointBehaviorSubject: BehaviorSubject<String> = new BehaviorSubject(endpoints.production);
  public observableEndpoint: Observable<String> = this.endpointBehaviorSubject.asObservable();
  private _currentEndpoint;
  constructor(private log: LogService, private platform: Platform) {
    this._currentEndpoint = this.platform.is('cordova') ? endpoints.cordovaLocal : endpoints.local
  }

  init() {
    this.currentEndpoint = this._currentEndpoint;
  }


  get currentEndpoint() {
    return this._currentEndpoint;
  }

  set currentEndpoint(endpoint: string) {
    if (endpoint.endsWith('/')) {
      endpoint = endpoint.substr(0, endpoint.length - 1);
    }
    //localStorage.setItem(EndpointService.ENDPOINT_STORAGE_KEY, endpoint)
    this._currentEndpoint = endpoint;
    this.endpointBehaviorSubject.next(this._currentEndpoint);
  }

  setEndpointToProduction() {
    this.currentEndpoint = endpoints['production'];
  }

  setEndpointToLocal() {
    this.currentEndpoint = endpoints['local'];
  }

}
