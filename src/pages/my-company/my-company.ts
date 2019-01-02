import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
//import { InAppBrowser } from '@ionic-native/in-app-browser';
//import { SocialSharing } from '@ionic-native/social-sharing';
import { SessionProvider } from '../../providers/session/session';
import { PropertyEditPage } from '../property-edit/property-edit';

@Component({
  selector: 'page-my-company',
  templateUrl: 'my-company.html',
})
export class MyCompanyPage {
  login: any = { username: "", password: "" };
  myProperties: any = [];
  cities: any = [];
  categories: any = [];
  showSplash: boolean;
  user: any;
  propertiesWhatsapps: any;
  agentId: number = 0;
  agentTotals: any = [];
  propertiesWhatsappsById: any = [];
  myPropertiesEmpty: boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public servicioProvider: ServicioProvider,
    private alertController: AlertController,
    public sessionProvider: SessionProvider,
    //private iab: InAppBrowser,
    //private socialSharing: SocialSharing
  ) {
    this.getCategories();
    this.getCities();

    this.sessionProvider.userEmitter.subscribe(userIsLoggedIn => {
      console.log('MyCompanyPage sessionProvider userEmitter userIsLoggedIn',userIsLoggedIn);
      if(userIsLoggedIn){      
        let userLogued = this.sessionProvider.getUserLogued();
        if (userLogued != null && userLogued.userid != null) {
          this.user = userLogued;
          this.getMyProperties(userLogued);
        }
        console.log('ionViewDidLoad MyCompanyPage userLogued', userLogued);
      }
    });


  }
  ionViewWillEnter() {
    this.agentTotals = { "totalPropiedades": 0, "totalWhatsapps": 0 };    
    this.showSplash = true;    
        let userLogued = this.sessionProvider.getUserLogued();
        //console.log('MyCompanyPage sessionProvider ionViewWillEnter getUserLogued',userLogued); 
        this.getMyProperties(userLogued);
  }
  ionViewDidLoad() {
    let userLogued = this.sessionProvider.getUserLogued();
    //console.log('MyCompanyPage sessionProvider ionViewDidLoad getUserLogued',userLogued); 
  }

  getMyProperties(user) {
    console.log('user', user);
    this.servicioProvider.getMyProperties(user)
      .subscribe(
        (data) => {
          //console.log('data', data);
          let DataArray:any = [];
          DataArray = data;
          if (DataArray && DataArray.length > 0) {
          this.myProperties = data;
          
            this.myProperties.forEach(property => {
              this.agentId = property.agent_id;
              property.imagesrc = this.servicioProvider.urlInmobiliaria + '/images/osproperty/properties/'+property.id+'/medium/'+property.image+'';              
              //console.log('img', 'http://inmobiliaria.diportal.com.ar/images/osproperty/properties/' + property.id + '/medium/' + property.image);
            });
            this.myPropertiesEmpty = false;
          }

          console.log('this.myProperties', this.myProperties);
          this.showSplash = false;

          this.getPropertiesWhatsapp();

          //this.sessionProvider.setMyProperties(this.myProperties);
        },
        (error) => {
          console.log('error', error);
          this.showSplash = false;
        }
      )
  }

  addProperty() {
    this.navCtrl.push(PropertyEditPage);
  }

  navToPropertyPage(event, property) {
    /*this.navCtrl.setRoot(PropertyEditPage, {
      property: property
    });*/
    this.navCtrl.push(PropertyEditPage, {
      property: property
    });
  }



  getCities() {
    this.servicioProvider.getCities()
      .subscribe(
        (data) => {
          console.log('getCities', data);
          this.sessionProvider.setCiudades(data);
          this.cities = data;
        },
        (error) => { console.log('error', error); }
      )
  }

  getCategories() {
    this.servicioProvider.getCategories()
      .subscribe(
        (data) => {
          console.log('getCategories', data);
          this.sessionProvider.setCategorias(data);
          this.categories = data;
        },
        (error) => { console.log('error', error); }
      )
  }

  getPropertiesWhatsapp() {
    console.log('this.agentId', this.agentId);
    this.servicioProvider.getPropertiesWhatsapp(this.agentId)
      .subscribe(
        (data) => {
          console.log('getPropertiesWhatsapp', data);
          if (data) {

          }
          this.propertiesWhatsapps = data;
          let totalPropiedades: number = 0;
          let totalWhatsapps: number = 0;

          this.agentTotals = { "totalPropiedades": 0, "totalWhatsapps": 0 };

          this.propertiesWhatsapps.forEach(element => {
            this.propertiesWhatsappsById[element.imported_property_id] = parseInt(element.total_pro_id);
            totalPropiedades++;
            totalWhatsapps = totalWhatsapps + parseInt(element.total_pro_id);
          });

          this.agentTotals.totalPropiedades = this.myProperties.length;
          this.agentTotals.totalWhatsapps = totalWhatsapps;

          console.log('this.agentTotals', this.agentTotals);
          console.log('this.propertiesWhatsappsById', this.propertiesWhatsappsById);
        },
        (error) => {
          console.log('error', error);
          this.showSplash = false;
          if (error.status == 0) {
            this.showAlert('Ocurrió un error', 'UPS! Parece que no hay conexión a internet.');
          } else {
            this.showAlert('Ocurrió un error', error.message);
          }

        }
      )

  }

  getPropertiesWhatsappsById(id) {
    //console.log('id',id);
    //console.log('this.propertiesWhatsappsById[id]',this.propertiesWhatsappsById[id]);
    if (this.propertiesWhatsappsById[id]) {
      return this.propertiesWhatsappsById[id];
    }
    return 0;
  }
  showAlert(title_: string, subTitle_: string) {
    const alert = this.alertController.create({
      title: title_,
      subTitle: subTitle_,
      buttons: ['OK']
    });
    alert.present();
  }

  /*
    addCompany(){
      let data = {"nombre":"fabio","whatsapp":"2916481551"}
      this.servicioProvider.addCompany(data)
        .subscribe(
          data => {
            console.log('addCompany data: ', data);
          },
          error => {
            console.log('addCompany error: ', error);
          }
        );
    }
  
    public goMyCompanyPage(){
      console.log('goMyCompanyPage');
      let url = 'https://inmobiliaria.diportal.com.ar/';
      console.log('url', url);    
      const browser = this.iab.create(url, '_blank', 'location=yes,toolbarcolor=#2196F3,closebuttoncolor=#FFFFFF,closebuttoncaption=Cerrar,hidenavigationbuttons=yes,hideurlbar=yes,footer=no');
      console.log('browser', browser);
  
    }
  
    public sendWhatsapp(){
      let mensaje: string = "Hola.\r\nEstoy interesado en agregar mi inmobiliaria.\r\nGracias.\r\n";
      this.socialSharing.shareViaWhatsAppToReceiver("541130190242",mensaje, null, null);    
    } 
  
    onSubmitLogin(formulario){
      let formData = formulario.form.value;
      this.servicioProvider.login(formData)
        .subscribe(
          data => {
            console.log('login data: ', data);
            this.sessionProvider.setUserLogued(data.data);
          },
          error => {
            console.log('login error: ', error);
          }
        );
      }
      */
  /*
  console.log('form',form);
  let dataSend = form.form.value;
  let url = 'https://inmobiliaria.diportal.com.ar/index.php?option=com_osproperty&task=api_login&username='+dataSend.username+'&password='+dataSend.password;
  console.log('url', url);    
  const browser = this.iab.create(url, '_blank', 'location=yes,toolbarcolor=#2196F3,closebuttoncolor=#FFFFFF,closebuttoncaption=Cerrar,hidenavigationbuttons=yes,hideurlbar=yes,footer=no');
 */
  /*
  this.servicioProvider.login(dataSend)
  .subscribe(
    data => {
      console.log('onSubmitLogin data: ', data);
    },
    error => {
      console.log('onSubmitLogin error: ', error);
    }
  );
  */
}
