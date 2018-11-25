import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HeaderColor } from '@ionic-native/header-color';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AgentPropertiesListPage,PropertyPage,ModalSearchPage,ProbarmapaPage,PropertiesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AgentPropertiesListPage,PropertyPage,ModalSearchPage,ProbarmapaPage,PropertiesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicioProvider,GoogleMaps,
    SessionProvider,Network,Toast,HeaderColor
  ]
})
export class AppModule {}
