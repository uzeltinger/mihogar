import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
//import { InAppBrowser } from '@ionic-native/in-app-browser';
//import { SocialSharing } from '@ionic-native/social-sharing';
import { SessionProvider } from '../../providers/session/session';

@Component({
  selector: 'page-my-company',
  templateUrl: 'my-company.html',
})
export class MyCompanyPage {
  login: any = { username: "", password: "" };
  myProperties: any = [];
  showSplash: boolean;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public servicioProvider: ServicioProvider,
    public sessionProvider: SessionProvider,
    //private iab: InAppBrowser,
    //private socialSharing: SocialSharing
  ) {
  }

  ionViewDidLoad() {
    let userLogued = this.sessionProvider.getUserLogued();
    this.showSplash = true;
    if (userLogued != null && userLogued.userid != null) {
      this.getMyProperties(userLogued);
    }
    console.log('ionViewDidLoad MyCompanyPage userLogued', userLogued);
  }

  getMyProperties(user) {
    this.servicioProvider.getMyProperties(user)
      .subscribe(
        (data) => {
          this.myProperties = data;
          this.myProperties.forEach(property => {
            console.log('img', 'http://inmobiliaria.diportal.com.ar/images/osproperty/properties/' + property.id + '/medium/' + property.image);
          });
          console.log('this.myProperties', this.myProperties);
          this.showSplash = false;
          //this.sessionProvider.setMyProperties(this.myProperties);
        },
        (error) => {
          console.log('error', error);
          this.showSplash = false;
        }
      )
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
