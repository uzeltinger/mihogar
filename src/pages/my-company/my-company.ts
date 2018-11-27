import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';

/**
 * Generated class for the MyCompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-company',
  templateUrl: 'my-company.html',
})
export class MyCompanyPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public proveedor: ServicioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCompanyPage');
    this.addCompany();
  }

  addCompany(){
    let data = {"nombre":"fabio","whatsapp":"2916481551"}
    this.proveedor.addCompany(data)
      .subscribe(
        data => {
          console.log('addCompany data: ', data);
        },
        error => {
          console.log('addCompany error: ', error);
        }
      );
  }

}
