import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  showSplash: boolean;
  properties: any;
  constructor(public navCtrl: NavController,
    public proveedor: ServicioProvider) {

  }

  ionViewDidLoad() {    
    this.getProperties();
  }

  getProperties() {
    this.proveedor.getProperties()
      .subscribe(
        (data) => {
          console.log('data', data);
          this.properties = data;
          this.showSplash = false;
        },
        (error) => {
          console.log('error', error);
          this.showSplash = false;
        }
      )
  }
}
