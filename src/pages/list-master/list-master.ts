import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import {ParkingService} from "../../providers/parking.service";
import {Parking} from "../../models/business/parking.model";

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Parking[];
  searchField: boolean;

  constructor(public navCtrl: NavController, private parkingService: ParkingService, public modalCtrl: ModalController) {
    this.parkingService.getAll().subscribe(
      parkings => {
        this.currentItems  = parkings;
      },
          (error: any) => console.log('error getting parkings', error)
      );
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        //this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    //this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  search() {
    this.searchField = !this.searchField;
  }

  filter() {

  }
}
