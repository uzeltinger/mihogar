import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { AgentPropertiesListPage } from '../agent-properties-list/agent-properties-list';
import { PropertyPage } from '../property/property';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  showSplash: boolean;
  properties: any;
  items: any = [];
  offersLimitStart: number = 0;
  offersLimit: number = 10;
  offersShowAll: boolean = false;

  constructor(public navCtrl: NavController,
    private alertController: AlertController,
    public proveedor: ServicioProvider) {

  }

  ionViewDidLoad() {    
    this.getProperties();
    this.showSplash = true;
  }

  getProperties() {
    
    //let sendData = {"cities":this.citiesFiltered,"categories":this.categoriesFiltered,"latitude":this.latitude,"longitude":this.longitude,"limit":this.offersLimit,"limitstart": this.offersLimitStart};
    let sendData = {"limit":this.offersLimit,"limitstart": this.offersLimitStart,"isFeatured":1};
    this.proveedor.getProperties(sendData)
      .subscribe(
        (data) => {
          console.log('data', data);
          this.properties = data;
          if(this.properties.length<this.offersLimit){
            this.offersShowAll = true;
            }          

          this.properties.forEach(element => {
            element.bath_room = parseInt(element.bath_room);
            this.items.push(element);
          });

          this.properties = data;
          this.showSplash = false;
        },
        (error) => {
          console.log('error', error);
          this.showSplash = false;
          
        this.showAlert('Ocurrió un error',error);
        }
      )
  }

  doInfinite(): Promise<any> {
    console.log('Begin async operation');
    return new Promise((resolve) => {
      this.offersLimitStart += this.offersLimit;
      console.log('this.offersLimitStart',this.offersLimitStart);
      if(!this.offersShowAll){
      this.getProperties();
      }
      setTimeout(() => {    
        resolve();
      }, 1000);
    })  
  }

  navToPropertyPage(event, property){
    this.navCtrl.push(PropertyPage, {
      property: property
    });
  }

  navToAgentPropertiesListPage(event, property){
    this.navCtrl.push(AgentPropertiesListPage, {
      property: property
    });
  }

  showAlert(title_: string, subTitle_: string) {
    const alert = this.alertController.create({
      title: title_,
      subTitle: subTitle_,
      buttons: ['OK']
    });
    alert.present();
  }

}
