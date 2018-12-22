import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PropertyEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-property-edit',
  templateUrl: 'property-edit.html',
})
export class PropertyEditPage {
  property:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.property = navParams.data.property;
    console.log('this.property', this.property);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PropertyEditPage');
  }

}
