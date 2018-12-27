import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';
import { HomePage } from '../home/home';
import { ServicioProvider } from '../../providers/servicio/servicio';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sessionProvider: SessionProvider,
    public servicioProvider: ServicioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
    this.sessionProvider.setUserLogout();
    this.navCtrl.setRoot(HomePage);
  }
}
