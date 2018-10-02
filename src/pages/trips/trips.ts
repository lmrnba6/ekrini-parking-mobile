import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TripDetailPage} from "../index";
import {TripService} from "../../providers/index";
import {IonicPage} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html'
})
export class TripsPage {
  // list of trips
  public trips: any;

  constructor(public nav: NavController, public tripService: TripService) {
    // set sample data
    this.trips = tripService.getAll();
  }

  // view trip detail
  viewDetail(id) {
    this.nav.push(TripDetailPage, {id: id});
  }
}
