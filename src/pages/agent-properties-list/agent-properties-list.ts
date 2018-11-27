import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, NavParams } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { PropertyPage } from '../property/property';
import { SessionProvider } from '../../providers/session/session';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-agent-properties-list',
  templateUrl: 'agent-properties-list.html',
})
export class AgentPropertiesListPage {
  showSplash: boolean;
  properties: any;
  items: any = [];
  offersLimitStart: number = 0;
  offersLimit: number = 10;
  offersShowAll: boolean = false;
  whatsappText: string
  filtrosAplicados: boolean = false;
  categoriesFiltered: any = [];
  citiesFiltered: any = [];
  priceRangeValue = { lower: 50000, upper: 200000 };
  alquilerRangeValue = { lower: 5000, upper: 20000 };
  dormitoriosValue: number = 0;
  ambientesValue: number = 0;
  typeSelected: number = 2;
  priceRangeValueApplied: boolean = false;
  alquilerRangeValueApplied: boolean = false;
  ciudadesById: any = [];
  categoriasById: any = [];
  
  property: any;
  agent_name: "";
  agent_id: number; 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public proveedor: ServicioProvider,
    private alertController: AlertController,
    public modalCtrl: ModalController,
    public sessionData: SessionProvider,
    private socialSharing: SocialSharing) {
      this.property = navParams.data.property;
      this.agent_id = this.property.agent_id;
      this.agent_name = this.property.agent_name;
    console.log('this.agent_id', this.agent_id);
    console.log('this.agent_name', this.agent_name);
    this.whatsappText = "Hola.\r\nEstoy interesado en esta propiedad.\r\nGracias.\r\n";
  }

  ionViewDidLoad() {    
    this.getProperties();
  }

  getProperties() {
    let sendData = {
      "limit": this.offersLimit,
      "limitstart": this.offersLimitStart,
      "agent_id":this.agent_id
    }

    this.proveedor.getAgentProperties(sendData)
    .subscribe(
      (data) => {
        console.log('getProperties', data);
        this.properties = data;
        console.log('getProperties total', this.properties.lenght);

        if (this.properties.length < this.offersLimit) {
          this.offersShowAll = true;
        }

        this.properties.forEach(element => {
          element.bath_room = parseInt(element.bath_room);
          if (element.mobile == '') {
            element.mobile = "1130190242";
          }
          element.link = "http://diportal.com.ar/component/osproperty/" + element.ref + "-" + element.pro_alias + "-" + element.id + ".html"

          element.price = parseInt(element.price);
          element.price = element.price.toLocaleString('es-AR');
          if (element.curr == 1) {
            element.moneda = "$";
          } else {
            element.moneda = "u$s";
          }
          this.items.push(element);
        });

        this.properties = data;
        this.showSplash = false;
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

  increaseWhatsappClick(property) {
    this.shareToWhatsapp(property);
    console.log('increaseWhatsappClick');
    this.proveedor.increaseWhatsappClick(property)
      .subscribe(
        data => {
          console.log('increaseWhatsappClick data: ', data);
          //href="https://api.whatsapp.com/send?phone=54{{property.mobile}}&text={{whatsappText}} {{property.link}}"
        },
        error => {
          console.log('increaseWhatsappClick error: ', error);
        }
      );
  }

  shareToWhatsapp(property:any){

  let whatsappUrl = "";
  let image = "http://diportal.com.ar/images/osproperty/properties/"+property.id+"/medium/"+property.image;
  this.socialSharing.shareViaWhatsAppToReceiver("54"+property.mobile,this.whatsappText, image, null);       
       console.log('image',image);
  }

  doInfinite(): Promise<any> {
    console.log('Begin async operation');
    return new Promise((resolve) => {
      this.offersLimitStart += this.offersLimit;
      console.log('this.offersLimitStart', this.offersLimitStart);
      console.log('this.offersShowAll', this.offersShowAll);
      if (!this.offersShowAll) {
        this.getProperties();
      }
      setTimeout(() => {
        resolve();
      }, 1000);
    })
  }

  navToPropertyPage(event, property) {
    this.navCtrl.push(PropertyPage, {
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
