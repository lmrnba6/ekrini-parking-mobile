import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Camera} from '@ionic-native/camera';
import {IonicPage, NavController, ViewController} from 'ionic-angular';
import {LogService} from "../../providers";
import {Observable} from "rxjs";
import {AlertController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {ToastController} from "ionic-angular";
import * as moment from 'moment';
import {HttpClient} from "@angular/common/http";
import {Parking} from "../../models/business/parking.model";
import {EndpointService} from "../../providers";
import {ParkingService} from "../../providers/parking.service";
import {LoadingController} from "ionic-angular";
import {Position} from "../../models/business/position.model";
import {Address} from "../../models/business/address.model";
import { AngularFireStorage } from '@angular/fire/storage';
import {google} from 'google-maps'; 

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;
  geocoder = new google.maps.Geocoder();
  isReadyToSave: boolean;
  imageUrl: string;
  item: any;
  position: Position = new Position();
  recurrence = ['NONE', 'EVERY_DAY', 'EVERY_WEEK'];
  form: FormGroup;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              formBuilder: FormBuilder,
              public camera: Camera,
              private log: LogService,
              private alertCtrl: AlertController,
              private translate: TranslateService,
              private toast: ToastController,
              private httpClient: HttpClient,
              private endPointService: EndpointService,
              private parkingService: ParkingService,
              private loadingCtrl: LoadingController,
              private storage: AngularFireStorage) {
    this.form = formBuilder.group({
      profilePic: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      zip: ['', Validators.required],
      number: [''],
      comment: [''],
      price: ['', Validators.required],
      size: [''],
      date: [moment().format('YYYY-MM-DD'), Validators.required],
      startTime: [moment().format('hh:mm:ss'), Validators.required],
      endTime: [moment().format('hh:mm:ss'), Validators.required],
      recurrence: ['NONE', Validators.required],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  getAddress() {
    const address = this.form.value.address + this.form.value.city
    const This = this;
    return new Observable(subscriber => {
      this.geocoder.geocode({'address': address}, function (results, status) {
        if (status.toString() === 'OK') {
          This.position.latitude = results[0].geometry.location.lat();
          This.position.longitude = results[0].geometry.location.lng();
          subscriber.next(results[0].formatted_address);
          subscriber.complete();
        } else {
          subscriber.error(null);
          subscriber.complete();
        }
      });
    });
  }

  uploadFile(event) {
    let loading = this.loadingCtrl.create();
    loading.present();
    const file = event.target.files[0];
    const filePath = 'ṕarking-'+new Date();
    const ref = this.storage.ref(filePath);
    const task = ref.put(file).then(data => {
      this.imageUrl = data.downloadURL;
      loading.dismiss();
    }).catch(err => {
      this.log.error('Error uploading image',err)
      loading.dismiss();
    });
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
    this.uploadFile(event);

  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')';
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (this.form.valid) {
      this.getAddress().subscribe((next: string) => {

        let alert = this.alertCtrl.create({
          title: this.translate.instant('messages.is-address-correct'),
          subTitle: next,
          buttons: [
            {
              text: this.translate.instant('No'),
              handler: () => {}
            },
            {
              text: this.translate.instant('Yes'),
              handler: () => {
                this.save();
              }
            }
          ]
        });
        alert.present();
      }, err => {
        this.toast.create({
          message: this.translate.instant('messages.wrong-address'),
          duration: 3000,
        }).present()
      });
    }
  }

  buildParkingObject() {
    const park = new Parking();
    park.address = new Address();
    park.address.addressOneLine = this.form.value.address;
    park.address.city = this.form.value.city;
    park.address.zip = this.form.value.zip;
    park.address.state = this.form.value.province;
    park.address.position = this.position;
    park.comment = this.form.value.comment;
    park.date = this.form.value.date;
    park.number = this.form.value.number;
    park.recurrence = this.form.value.recurrence;
    park.size = this.form.value.size;
    park.price = this.form.value.price;
    park.timeStart = this.form.value.startTime;
    park.timeEnd = this.form.value.endTime;
    park.imageUrl = this.imageUrl;
    return park;
  }

  save() {
    const loading = this.loadingCtrl.create();
    loading.present();
    this.parkingService.create(this.buildParkingObject()).subscribe(res => {
      this.log.info('Parking created successfully');
      loading && loading.dismiss();
      this.toast.create({
        message: this.translate.instant('messages.success-create-parking'),
        duration: 3 * 1000,
      }).present();
      this.viewCtrl.dismiss(this.form.value);
    }, err => {
      this.log.error('Parking has not been created', err);
      loading && loading.dismiss();
      this.toast.create({
        message: this.translate.instant('messages.error-create-parking'),
        duration: 6 * 1000,
      }).present();
    });
  }
}
