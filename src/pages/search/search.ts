import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {MenuController} from "ionic-angular";

import {Subject} from "rxjs/Subject";
import {LogService} from "../../providers";
import {Geolocation} from "@ionic-native/geolocation";
import {ParkingService} from "../../providers/parking.service";
import {Parking} from "../../models/business/parking.model";
import {OnDestroy} from "@angular/core";

declare var google;

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage implements OnDestroy{

  private unsubscribe: Subject<void> = new Subject<void>();
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address: string = '';
  status: string;
  searchMarker;
  currentMarker;
  myCurrentPosition;
  parkings = [];
  infoWindow: google.maps.InfoWindow;
  geocoder = new google.maps.Geocoder();
  orderRankToggle: boolean = false;

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private navParams: NavParams,
              private geolocation: Geolocation,
              private menuCtrl: MenuController,
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

  ionViewDidLoad(): void {
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
      this.geolocation.getCurrentPosition().then((position) => {
        this.myCurrentPosition = position;
        this.createMap(new google.maps.LatLng(position.coords.latitude, position.coords.latitude));
        this.centerMap();
        this.parkings.forEach((park: Parking) => this.addMarker(park));
      }, (error) => {
        this.log.error('error on geolocation ', error);
      });
    }
  }


  getAddress() {
    let This = this;
    this.geocoder.geocode( { 'address': this.address}, function(results, status) {
      if (status == 'OK') {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        let latLng = new google.maps.LatLng(lat, lng);
        This.searchMarker && This.searchMarker.setMap(null);
        This.map.setCenter(latLng);
        This.addAddressSearchedMarker(lat, lng);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  addAddressSearchedMarker(lat, lng) {
    new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(lat, lng),
      icon: 'http://maps.google.com/mapfiles/kml/pal3/icon28.png',
      label: '',
    });
  }

  createMap(position: any) {
    let mapOptions = {
      center: position,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      controls: {
        compass: false,
        myLocation: true,
        myLocationButton: true,
        indoorPicker: false,
        zoom: false
      },
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    google.maps.event.addListener(this.map, 'click', () => {
      if (this.infoWindow) {
        this.infoWindow.close();
      }
    });
  }

  centerMap() {
    const latLng = new google.maps.LatLng(this.myCurrentPosition.coords.latitude, this.myCurrentPosition.coords.longitude);
    this.map.setCenter(latLng);
    if(!this.currentMarker) {
      this.currentMarker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
        icon: 'http://maps.google.com/mapfiles/kml/pal3/icon31.png',
      });
    }
  }

  addMarker(parking: Parking): google.maps.Marker {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(parking.address.position.latitude, parking.address.position.longitude),
      color: 'red',
      label: parking.price.toString() + '$',
      parking
    });
      try {
        google.maps.event.addListener(marker, 'click', () => {
          this.markerClicked(parking, marker);
        });
      } finally {
        return marker;
      }
  }

  markerClicked(parking: Parking, marker) {
      let content = parking.address.addressOneLine;
      this.infoWindow = new google.maps.InfoWindow({
        content: content
      });
      this.infoWindow.open(this.map, marker);

  }
}
