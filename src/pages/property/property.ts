import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController, LoadingController } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker
} from '@ionic-native/google-maps';
import { PropertiesPage } from '../properties/properties';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-property',
  templateUrl: 'property.html',
})
export class PropertyPage {
  // @ViewChild('map') mapElement: ElementRef;
  property: any;
  propertyData: any = {};
  showSplash: boolean = false;
  imagenes: any = [];
  mapReady: boolean = false;
  map: GoogleMap;
  agentSelected: boolean = false;
  agentFiltered: any = { agent_id: 0, agent_name: "" };
  whatsappText: string;
  whatsappLink: string;
  propertyShowMap: boolean = false;

  constructor(public navCtrl: NavController,
    //public googleMaps: GoogleMaps,
    public navParams: NavParams,
    public sanitizer: DomSanitizer,
    public loadingCtrl: LoadingController,
    private socialSharing: SocialSharing,
    public toastCtrl: ToastController,
    public proveedor: ServicioProvider,
    private platform: Platform) {
    this.property = navParams.data.property;
    this.getProperty(this.property.id);
    this.imagenes.push(this.property.image);
    console.log('this.imagenes', this.imagenes);
    console.log('this.property', this.property);
  }

  async ngOnInit() {

    this.whatsappText = "Hola.%0AEstoy%20interesado%20en%20esta%20propiedad.%0A";
    this.whatsappLink = "http://mihogar.net.ar/propiedad/" + this.property.id + ".html";

    if (localStorage.getItem("agentFiltered") === null) {
      this.agentFiltered = null;
    } else {
      this.agentFiltered = JSON.parse(localStorage.getItem("agentFiltered"));
    }

    if (this.agentFiltered != null && this.agentFiltered.agent_id > 0) {
      this.agentSelected = true;
    }

    if (this.property.pro_video != "") {
      var regex = /<iframe.*?src="(.*?)".*?<\/iframe>/;
      var src = regex.exec(this.property.pro_video)[1];
      console.log('src', src);
      this.property.pro_video_url = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    }

    if (this.property.lat_add != null && this.property.long_add != null) {
      this.propertyShowMap = true;
    }
    console.log('this.propertyShowMap',this.propertyShowMap);
  }


  getProperty(id) {
    this.proveedor.getProperty(id)
      .subscribe(
        (data) => {
          console.log('data', data);
          this.propertyData = data;
          this.imagenes = this.propertyData.imagenes;
          this.showSplash = false;
          console.log('this.imagenes', this.imagenes);
        },
        (error) => {
          console.log('error', error);
          this.showSplash = false;
        }
      )
  }
  navToAgentPropertiesListPage(event, property) {
    let agentFiltered = { agent_id: property.agent_id, agent_name: property.agent_name };
    console.log('agentFiltered', agentFiltered);
    localStorage.setItem("agentFiltered", JSON.stringify(agentFiltered));

    this.navCtrl.push(PropertiesPage, {
      property: property
    });
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }

  ionViewDidLoad() {
    if (!this.platform.is('core')) {
      this.loadMap();
    }

  }

  loadMap() {
    console.log('this.property.lat_add', this.property.lat_add);
    console.log('this.property.long_add', this.property.long_add);
    this.map = GoogleMaps.create('map_property', {
      camera: {
        target: {
          lat: parseFloat(this.property.lat_add),
          lng: parseFloat(this.property.long_add)
        },
        zoom: 15,
        tilt: 30
      }
    });
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      //this.mapReady = true;
      this.addMarkerToMap();
    });
  }

  addMarkerToMap() {
    console.log('setCenter', 'setCenter');
    var center = { "lat": parseFloat(this.property.lat_add), "lng": parseFloat(this.property.long_add) };
    this.map.set('center', center);

    let marker: Marker = this.map.addMarkerSync({
      title: this.property.city_name + ' - ' + this.property.category_name,
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: parseFloat(this.property.lat_add),
        lng: parseFloat(this.property.long_add)
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
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
    let whatsappText = "Hola.\r\nEstoy interesado en esta propiedad.";
    let whatsappImage = "http://diportal.com.ar/images/osproperty/properties/" + property.id + "/medium/" + property.image + "";
    let whatsappUrl = "\r\nhttp://mihogar.net.ar/propiedad/" + property.id + ".html";
    console.log('whatsappText', whatsappText);
    console.log('whatsappImage', whatsappImage);
    console.log('whatsappUrl', whatsappUrl);
    this.socialSharing.shareViaWhatsAppToReceiver("+54" + property.mobile, whatsappText, whatsappImage, whatsappUrl)
  }



  getImageSrcSanetized(propertyId: string, image: string) {
    let url: string = "http://diportal.com.ar/images/osproperty/properties/" + propertyId + "/medium/" + image;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
