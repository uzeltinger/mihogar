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
import { ServicioProvider } from '../providers/servicio/servicio';
import { FavoritesPage } from '../pages/favorites/favorites';
import { FavoritesProvider } from '../providers/favorites/favorites';
import { AboutPage } from '../pages/about/about';
import { LogoutPage } from '../pages/logout/logout';
import { MyCompanyPage } from '../pages/my-company/my-company';
import { isNullOrUndefined } from 'util';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    private alertController: AlertController,
    public sessionProvider: SessionProvider,
    private favoriteService: FavoritesProvider,
    public proveedor: ServicioProvider,
    private network: Network,
    public headerColor: HeaderColor,
    private toast: Toast,
    public splashScreen: SplashScreen) {
    //localStorage.clear();
    this.initializeApp();

    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Propiedades', component: PropertiesPage },
      { title: 'Mis favoritos', component: FavoritesPage },
      { title: 'Información', component: AboutPage }
    ];

    this.sessionProvider.userEmitter.subscribe(userIsLoggedIn => {
      console.log('userIsLoggedIn',userIsLoggedIn);
      if(userIsLoggedIn){     
        let userLogued = this.sessionProvider.getUserLogued();
        //console.log('MyApp sessionProvider userEmitter userLogued',userLogued);   
      this.pages = [
        { title: 'Inicio', component: HomePage },
        { title: 'Propiedades', component: PropertiesPage },
        { title: 'Mis favoritos', component: FavoritesPage },
        { title: 'Información', component: AboutPage },
        { title: 'Inmobiliaria', component: MyCompanyPage },
        { title: 'Salir', component: LogoutPage }      
      ];
    }else{
      this.pages = [
        { title: 'Inicio', component: HomePage },
        { title: 'Propiedades', component: PropertiesPage },
        { title: 'Mis favoritos', component: FavoritesPage },
        { title: 'Información', component: AboutPage }
      ];
    }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {   
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();      
      this.headerColor.tint('#2196F3');
      this.getStoredFavorites();
      this.getUrlInmobiliaria();
      this.listenConnection();
      this.getLastVersion();
      if (this.platform.is('android')) {
        this.statusBar.styleBlackOpaque();
        this.statusBar.backgroundColorByHexString('#1565C0');
        this.statusBar.show();
        //this.splashScreen.hide();
      }

      
    let userLogued = this.sessionProvider.getUserLogued();
    console.log('initializeApp ComponentPage userLogued',userLogued);    

    });
  }
  
  getUrlInmobiliaria(){
    this.proveedor.getUrlInmobiliaria().then
      (
        (data) => {
          console.log('component getUrlInmobiliaria ', data);
          this.proveedor.setUrlInmobiliaria(data);
          //this.urlInmobiliaria = data;          
        },
        (error) => { console.log('component error', error); }
      )
  }
  getStoredFavorites(){
    this.favoriteService.getStoredFavorites();
  }

  getLastVersion() {
    let version = "1.1.2"
    this.proveedor.getLastVersion()
      .subscribe(
        (data) => {
          console.log('getLastVersion : this version ', data+' : '+version);
          if (data > version) {
            this.showConfirm();
          }
        },
        (error) => { console.log('error', error); }
      )
  }

  showConfirm() {
    const confirm = this.alertController.create({
      title: 'Actualización',
      message: 'Hay una nueva versión de la aplicación, es recomendable que la actualice desde Play Store.',
      buttons: [
        {
          text: 'Actualizar',
          handler: () => {
            console.log('Actualizar clicked');
            window.open('https://play.google.com/store/apps/details?id=ar.com.mihogar', '_system', 'location=yes');

          }
        },
        {
          text: 'Cerrar',
          handler: () => {
            console.log('Cerrar clicked');
          }
        }
      ]
    });
    confirm.present();
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
