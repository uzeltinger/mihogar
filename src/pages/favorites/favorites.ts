import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { FavoritesProvider } from '../../providers/favorites/favorites';
import { PropertyPage } from '../property/property';
import { AgentPropertiesListPage } from '../agent-properties-list/agent-properties-list';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  showSplash: boolean;
  properties: any;
  items: any = [];
  favoritosGuardados: any = [];
  whatsappText:string = "Hola.\r\nEstoy interesado en esta propiedad.\r\n";
  whatsappLink:string = "";
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoriteService: FavoritesProvider,
    private alertController: AlertController,
    public proveedor: ServicioProvider) {
      this.whatsappText = "Hola.%0AEstoy%20interesado%20en%20esta%20propiedad.%0A";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
    this.favoritosGuardados = this.favoriteService.getFavorites();
    console.log('this.favoritosGuardados',this.favoritosGuardados);
    if(this.favoritosGuardados.length==0){
      this.showAlert('No hay favoritos', 'UPS! Parece que no hay propiedades guardadas en favoritos.');
    }else{
      this.getFavorites(this.favoritosGuardados);
    }
    
  }

  getFavorites(favoritosGuardados){      

    this.showSplash = true;
  this.proveedor.getFavorites(favoritosGuardados)
  .subscribe(
    (data) => {
      console.log('getProperties', data);
      this.properties = data;
      console.log('getProperties total', this.properties.lenght);
      
      if(this.properties.length==0){
        this.showAlert('No hay resultados', 'UPS! Parece que no hay resultados con esos criterios de búsqueda.');
      }      

      this.properties.forEach(element => {
        element.bath_room = parseInt(element.bath_room);
        if (element.mobile == '') {
          element.mobile = "1130190242";
        }
        element.link = "http://diportal.com.ar/component/osproperty/" + element.ref + "-" + element.pro_alias + "-" + element.id + ".html"
        element.whatsappLink = "http://mihogar.net.ar/propiedad/" + element.id + ".html";
        element.price = parseInt(element.price);
        element.price = element.price.toLocaleString('es-AR');
        if (element.curr == 1) {
          element.moneda = "$";
        } else {
          element.moneda = "u$s";
        }
        this.items.push(element);
      });
      this.properties = data;
      this.showSplash = false;
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

removeToFavorites(property): void{  
  console.log('removeToFavorites');
    this.favoriteService.removeFavorite(property.id);
    property.isFavorite = false;
    let index = 0;
    console.log('index',index);
    this.items.forEach(element => {
      if(element.id === property.id){
        this.items.splice(index, 1);    
      }
      index++;
    });    
}

increaseWhatsappClick(property) {
  this.shareToWhatsapp(property);
  console.log('increaseWhatsappClick');
  this.proveedor.increaseWhatsappClick(property)
    .subscribe(
      data => {
        console.log('increaseWhatsappClick data: ', data);
        //href="https://api.whatsapp.com/send?phone=54{{property.mobile}}&text={{whatsappText}} {{property.link}}"
      },
      error => {
        console.log('increaseWhatsappClick error: ', error);
      }
    );
}

shareToWhatsapp(property: any) {
  //let whatsappText = "Hola.\r\nEstoy interesado en esta propiedad.\r\n";
  //let link = "http://mihogar.net.ar/propiedad/" + property.id + ".html";
  //this.socialSharing.shareViaWhatsAppToReceiver("54" + property.mobile, whatsappText, null, link);
  //this.socialSharing.share('',null,image,null);
  //console.log('image', link);
}

navToPropertyPage(event, property) {
  this.navCtrl.push(PropertyPage, {
    property: property
  });
}

navToAgentPropertiesListPage(event, property) {
  this.navCtrl.push(AgentPropertiesListPage, {
    property: property
  });
}

showAlert(title_: string, subTitle_: string) {
  const alert = this.alertController.create({
    title: title_,
    subTitle: subTitle_,
    buttons: ['OK']
  });
  alert.present();
}
}