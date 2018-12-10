import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HeaderColor } from '@ionic-native/header-color';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ListPage } from '../pages/list/list';
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { ServicioProvider } from '../providers/servicio/servicio';
import { AgentPropertiesListPage } from '../pages/agent-properties-list/agent-properties-list';
import { PropertyPage } from '../pages/property/property';
import { ModalSearchPage } from '../pages/modal-search/modal-search';
import { ProbarmapaPage } from '../pages/probarmapa/probarmapa';
import { PropertiesPage } from '../pages/properties/properties';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SessionProvider } from '../providers/session/session';
import { WhatsappPropertiesListPage } from '../pages/whatsapp-properties-list/whatsapp-properties-list';
import { MyCompanyPage } from '../pages/my-company/my-company';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FavoritesPage } from '../pages/favorites/favorites';
import { FavoritesProvider } from '../providers/favorites/favorites';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AgentPropertiesListPage,PropertyPage,ModalSearchPage,ProbarmapaPage,PropertiesPage,
    WhatsappPropertiesListPage,MyCompanyPage,FavoritesPage,AboutPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AgentPropertiesListPage,PropertyPage,ModalSearchPage,ProbarmapaPage,PropertiesPage,
    WhatsappPropertiesListPage,MyCompanyPage,FavoritesPage,AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicioProvider,GoogleMaps,
    SessionProvider,Network,Toast,HeaderColor,SocialSharing,
    FavoritesProvider,InAppBrowser
  ]
})
export class AppModule {}
