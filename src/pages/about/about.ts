import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, 
    public socialSharing: SocialSharing,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }
  
  contactToWhatsapp(property: any) {    
    let whatsappText = "Hola.\r\nEstoy interesado en la app.";
    console.log('whatsappText', whatsappText);
    this.socialSharing.shareViaWhatsAppToReceiver("+541130190242", whatsappText, null, null)
  }

}
