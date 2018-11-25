import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { HomePage } from '../pages/home/home';
import { PropertiesPage } from '../pages/properties/properties';
import { SessionProvider } from '../providers/session/session';
import { Toast } from '@ionic-native/toast';
import { HeaderColor } from '@ionic-native/header-color';
import { WhatsappPropertiesListPage } from '../pages/whatsapp-properties-list/whatsapp-properties-list';
//import { ListPage } from '../pages/list/list';
//import { ModalSearchPage } from '../pages/modal-search/modal-search';
//import { ProbarmapaPage } from '../pages/probarmapa/probarmapa';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    private alertController: AlertController,
    public sessionProvider: SessionProvider,
    private network: Network,
    public headerColor: HeaderColor,
    private toast: Toast,
    public splashScreen: SplashScreen) {
      localStorage.clear();
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Propiedades', component: PropertiesPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      this.headerColor.tint('#2196F3');
      this.listenConnection();
      if (this.platform.is('android')) {
        this.statusBar.styleBlackOpaque();
        this.statusBar.backgroundColorByHexString('#1565C0');
        this.statusBar.show();
        this.splashScreen.hide();
      }

    });
  }
  
  private listenConnection(): void {
    console.log('this.network.type', this.network.type);
    if (this.network.type == 'none') {
      this.sessionProvider.setConectadoAinternet(false);
      console.log('this.network.type es == none');
      this.showToast('Dispositivo desconectado. Por favor verifique su conección a internet!');
    } else {
      this.sessionProvider.setConectadoAinternet(true);
    }
    this.network.onDisconnect()
      .subscribe(() => {
        this.sessionProvider.setConectadoAinternet(false);
        this.showToast('Dispositivo desconectado. Por favor verifique su conección a internet!');
        this.showAlert();
      });
    this.network.onConnect().subscribe(() => {
      this.sessionProvider.setConectadoAinternet(true);
      this.showToast('Dispositivo Conectado!');
    });
  }
  showAlert() {
    var title_: string = 'Error de conección del dispositivo';
    var subTitle_: string = 'Por favor verifique su conección a internet!';
    const alert = this.alertController.create({
      title: title_,
      subTitle: subTitle_,
      buttons: ['OK']
    });
    alert.present();
  }

  showToast(text: string, duration: string = '3000', position: string = 'bottom') {
    if (this.platform.is('android')) {
      this.toast.show(text, duration, position).subscribe(
        toast => {
          console.log('line: 109  toast this.userInfo.first_name ', '');
        }
      );
    } else {
      console.log('showToast ', text);
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
