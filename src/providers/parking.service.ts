import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {EndpointService} from "./endpoint.service";
import {Parking} from "../models/business/parking.model";
import {Observable} from "rxjs";
import {LogService} from "./log.service";
import {plainToArray} from "../util/json-converter/json-converter";

const CONFIG ={
  PARKING_URL: "/api/mobile/v1/parking",
}

@Injectable()
export class ParkingService {


  constructor(public http: HttpClient, private endPointService: EndpointService, private log: LogService) {
  }

  create(parking: Parking) {
    return this.http.post(this.endPointService.currentEndpoint + CONFIG.PARKING_URL, parking);
      // .retryWhen(error => {
      //   return error.flatMap((error: any) => {
      //     this.log.info('Got error on creating parking', JSON.stringify(error));
      //     this.log.error('Retrying creating parking', error);
      //     return Observable.of(error.status).delay(1000);
      //   })
      //     .take(5)
      //     .concat(Observable.throw({error: '5 retries exceeded.'}));
      // });
  }

  getAll() {
    return this.http.get(this.endPointService.currentEndpoint + CONFIG.PARKING_URL)
      .map((body: any) => plainToArray(Parking, body.content));
  }
}
