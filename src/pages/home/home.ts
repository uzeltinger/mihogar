import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PropertiesPage } from '../properties/properties';
import { WhatsappPropertiesListPage } from '../whatsapp-properties-list/whatsapp-properties-list';
import { ServicioProvider } from '../../providers/servicio/servicio';
/*import { InAppBrowser } from '@ionic-native/in-app-browser';*/
import { LoginPage } from '../login/login';
import { CuponesPage } from '../cupones/cupones';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  clickHomeLogoAmount: number = 0;
  
  constructor(public navCtrl: NavController,
    public proveedor: ServicioProvider/*,private iab: InAppBrowser*/){

  }
  ionViewDidLoad() {
    
  }

  goPropertiesPage(){
    this.navCtrl.setRoot(PropertiesPage);    
  }

  public goMyCompanyPage(){
    this.navCtrl.push(LoginPage);   
  }

  public goCuponesPage(){
    this.navCtrl.push(CuponesPage);   
  }

  clickHomeLogo(){
    this.clickHomeLogoAmount++;
    if(this.clickHomeLogoAmount==9){
      this.clickHomeLogoAmount = 0;
      this.navCtrl.setRoot(WhatsappPropertiesListPage);    
    }
  }

}