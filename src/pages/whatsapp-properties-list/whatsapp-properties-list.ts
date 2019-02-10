import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the WhatsappPropertiesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-whatsapp-properties-list',
  templateUrl: 'whatsapp-properties-list.html',
})
export class WhatsappPropertiesListPage {
  properties: any;
  showSplash: boolean;
  agentTotals: any = [];

  constructor(public navCtrl: NavController, 
    private alertController: AlertController,
    private iab: InAppBrowser,
    public navParams: NavParams,
    public proveedor: ServicioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhatsappPropertiesListPage');
    this.getPropertiesWhatsapp();
  }

  getPropertiesWhatsapp() {    
    this.proveedor.getPropertiesWhatsapp(0)
    .subscribe(
      (data) => {
        console.log('getPropertiesWhatsapp', data);
        this.properties = data;
        let lastAgentId:number = 0;
        let totalPropiedades: number = 0;
        let totalWhatsapps: number = 0;
        this.properties.forEach(element => {
          if(element.agent_id != lastAgentId){
            totalPropiedades = 0;
            totalWhatsapps = 0;
            this.agentTotals[element.agent_id] = {"totalPropiedades":0,"totalWhatsapps":0};
          }
          totalPropiedades++;
          totalWhatsapps = totalWhatsapps + parseInt(element.total_pro_id);
          this.agentTotals[element.agent_id].totalPropiedades = totalPropiedades;
          this.agentTotals[element.agent_id].totalWhatsapps = totalWhatsapps;
          element.lastAgentId = lastAgentId;
          lastAgentId = element.agent_id;
        });
        console.log('this.agentTotals', this.agentTotals);
      },
      (error) => {
        console.log('error', error);
        this.showSplash = false;
        if(error.status==0){
          this.showAlert('Ocurrió un error', 'UPS! Parece que no hay conexión a internet.');
        }else{
          this.showAlert('Ocurrió un error', error.message);
        }
        
      }
    )

  }

  goCuponesCategorias(){
    const browser = this.iab.create('https://mioferta.com.ar/mihogarcupones/');
    browser.show();
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
