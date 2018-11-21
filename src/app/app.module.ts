import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { ServicioProvider } from '../providers/servicio/servicio';
import { AgentPropertiesListPage } from '../pages/agent-properties-list/agent-properties-list';
import { PropertyPage } from '../pages/property/property';
import { ModalSearchPage } from '../pages/modal-search/modal-search';
import { ProbarmapaPage } from '../pages/probarmapa/probarmapa';
import { GoogleMaps } from '@ionic-native/google-maps';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AgentPropertiesListPage,PropertyPage,ModalSearchPage,ProbarmapaPage
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
    AgentPropertiesListPage,PropertyPage,ModalSearchPage,ProbarmapaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicioProvider,GoogleMaps
  ]
})
export class AppModule {}
