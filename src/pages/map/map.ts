import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

import {Subject} from "rxjs/Subject";
import {LogService} from "../../providers";
import {Geolocation} from "@ionic-native/geolocation";
import {ParkingService} from "../../providers/parking.service";
import {Parking} from "../../models/business/parking.model";


declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject<void>();
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  status: string;
  rank: number = 1;
  parkings = []

  infoWindow: google.maps.InfoWindow;

  parkingToggle: boolean = false;

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private navParams: NavParams,
              private geolocation: Geolocation,
              private log: LogService,
              private parkingService: ParkingService) {
    this.status = this.navParams.data.status;
    this.parkingService.getAll().subscribe(
      parkings => {
        this.parkings  = parkings;
      },
      (error: any) => console.log('error getting parkings', error)
    );
  }

  ngOnInit(): void {
    this.loadMap();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    if (this.map) {
      this.map = null;
    }
  }


  loadMap() {
    // FIXME find better initial location
    if (this.map) {
      this.map.clearAll();
    } else {
      this.createMap(new google.maps.LatLng(45.400395, -71.896295));
      this.geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.setCenter(latLng);
      }, (error) => {
        this.log.error('error on geolocation ', error);
      });
    }
  }

  createMap(position: any) {
    let mapOptions = {
      center: position,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    //Adding a listener to close infowindow when clicked elsewhere on the map.
    google.maps.event.addListener(this.map, 'click', () => {
      if (this.infoWindow) {
        this.infoWindow.close();
      }
    });

  }

  toggleSetOrder() {
    this.parkingToggle = !this.parkingToggle;
  }

  addMarkerForParking(parking: Parking): google.maps.Marker {
    if (parking && parking.address && parking.address.position && parking.address.position.latitude && parking.address.position.longitude) {
      let position = new google.maps.LatLng(parking.address.position.latitude, parking.address.position.longitude);
      let color = 'red';
      let label = parking.price;
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: position,
        icon: color,
        label: label,
        parking
      });
      try {
        google.maps.event.addListener(marker, 'click', () => {
          this.markerClicked(marker);
        });
      } finally {
        return marker;
      }

    }
  }

  markerClicked(marker: google.maps.Marker) {
    let parking: Parking = marker.get('parking');
      if (this.infoWindow) {
        this.infoWindow.close();
      } else {

        let content = parking.address;
        this.infoWindow = new google.maps.InfoWindow({
          content: content
        });
        this.infoWindow.open(this.map, marker);
      }
    }

}
