import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, LoadingController } from 'ionic-angular';
import { AgentPropertiesListPage } from '../agent-properties-list/agent-properties-list';
import { ServicioProvider } from '../../providers/servicio/servicio';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
/**
 * Generated class for the PropertyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-property',
  templateUrl: 'property.html',
})
export class PropertyPage {
  property: any;
  propertyData: any;
  showSplash:boolean = false;
  imagenes: any = [];


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public loadingCtrl: LoadingController,
     public toastCtrl: ToastController,
     public proveedor: ServicioProvider,
     private platform: Platform) {
      this.property = navParams.data.property;
      this.getProperty(this.property.id);
      this.imagenes.push(this.property.image);
      console.log('this.imagenes', this.imagenes);
    console.log('this.property', this.property);
  }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PropertyPage');
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
  }
  getProperty(id){
  this.proveedor.getProperty(id)
      .subscribe(
        (data) => {
          console.log('data', data);
          this.propertyData = data;
          this.imagenes = this.propertyData.imagenes;
          this.showSplash = false;
          console.log('this.imagenes', this.imagenes);
        },
        (error) => {
          console.log('error', error);
          this.showSplash = false;          
        }
      )
  }
  navToAgentPropertiesListPage(event, property){
    this.navCtrl.push(AgentPropertiesListPage, {
      property: property
    });
  }
  
 

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }

  
}
