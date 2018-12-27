import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SessionProvider } from '../../providers/session/session';
import { MyCompanyPage } from '../my-company/my-company';
import { ConfigurationPage } from '../configuration/configuration';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: any = { username: "", password: "" };
  loading: any;
  showSplash: boolean;
  toolbarShow: boolean = false;
  urlInmobiliaria: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public servicioProvider: ServicioProvider,
    public sessionProvider: SessionProvider,
    private alertController: AlertController,
    public loadingCtrl: LoadingController,
    private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    this.showSplash = true;
    let userLogued = this.sessionProvider.getUserLogued();
    this.getUrlInmobiliaria();
    console.log('ionViewDidLoad MyCompanyPage userLogued', userLogued);
  }
  ionViewWillEnter() {
    this.showSplash = true;
    console.log('ionViewWillEnter LoginPage');
    let userLogued = this.sessionProvider.getUserLogued();
    if (userLogued && userLogued.userid != null) {
      this.navCtrl.setRoot(MyCompanyPage);
      console.log('ionViewDidLoad MyCompanyPage userLogued', userLogued);
      //this.showSplash = false;
    } else {
      this.showSplash = false;
    }
  }
  
  getUrlInmobiliaria() {
    this.servicioProvider.getUrlInmobiliaria().then
      (
        (data) => {
          console.log('getUrlInmobiliaria ', data);
          this.urlInmobiliaria = data;          
        },
        (error) => { console.log('error', error); }
      )
  }


  /*addCompany(){
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
  }*/

  public goMyCompanyPage() {
    /*
    console.log('goMyCompanyPage');
    let url = 'https://inmobiliaria.diportal.com.ar/';
    console.log('url', url);    
    const browser = this.iab.create(url, '_blank', 'location=yes,toolbarcolor=#2196F3,closebuttoncolor=#FFFFFF,closebuttoncaption=Cerrar,hidenavigationbuttons=yes,hideurlbar=yes,footer=no');
    console.log('browser', browser);
*/
  }

  public sendWhatsapp() {
    let mensaje: string = "Hola.\r\nEstoy interesado en agregar mi inmobiliaria.\r\nGracias.\r\n";
    this.socialSharing.shareViaWhatsAppToReceiver("541130190242", mensaje, null, null);
  }

  onSubmitLogin(formulario) {
    this.loading = this.loadingCtrl.create({
      content: 'Un momento por favor...',
      dismissOnPageChange: true
    });
    this.loading.present();
    let formData = formulario.form.value;
    this.servicioProvider.setUrlInmobiliaria(formData.urlInmobiliaria);
    this.servicioProvider.login(formData)
      .subscribe(
        data => {
          console.log('login data: ', data);
          this.loading.dismiss();
          if (data.data.login_result) {
            this.sessionProvider.setUserLogued(data.data);
            this.navCtrl.setRoot(MyCompanyPage);
          } else {
            this.showAlert('Error', 'UPS! Parece que los datos ingresados no son correctos.');
          }
        },
        error => {
          this.loading.dismiss();
          console.log('login error: ', error);
          this.showAlert('No hay conexión', 'UPS! Parece que no hay conexión con el servidor.');
        }
      );
  }

  showAlert(title_: string, subTitle_: string) {
    const alert = this.alertController.create({
      title: title_,
      subTitle: subTitle_,
      buttons: ['OK']
    });
    alert.present();
  }

  goConfigurationPage() {
    this.navCtrl.push(ConfigurationPage);
  }
  toolbarToggle() {
    this.toolbarShow = this.toolbarShow ? false : true;
  }
}