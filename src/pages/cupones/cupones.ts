import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { OfferServiceProvider } from '../../providers/offer-service/offer-service';
import { HomePage } from '../home/home';
import { CuponesSearchPage } from '../cupones-search/cupones-search';

@Component({
  selector: 'page-cupones',
  templateUrl: 'cupones.html',
})
export class CuponesPage {

  offers: any
  whatsappText: string
  showSplash = true; // <-- show animation
  categoriesFiltered: any = [];
  citiesFiltered: any = [];
  latitude: number = 0;
  longitude: number = 0;
  filtrosAplicados: boolean = false;
  items: any = [];
  offersLimitStart: number = 0;
  offersLimit: number = 10;
  offersShowAll: boolean = false;

  constructor(public navCtrl: NavController,
    public offerService: OfferServiceProvider,
    private alertController: AlertController,
    public statusBar: StatusBar,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {
    this.whatsappText = "Entre%20hoy%20y%20mañana%20paso%20a%20retirar%20la%20oferta.%0AGracias";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuponesPage');
    /*
    this.offerService.obtenerCategoriasDeOfertas()
    .subscribe(
      (data)=> {    
        console.log('data',data) ;  
        let categoriesFiltered: any = [];
        categoriesFiltered = data;
        categoriesFiltered.forEach(element => {
          if(element.mhcid){
            this.categoriesFiltered.push(element.mhcid); 
          }
        }); 
        
        this.getOffers();
      },
      (error)=>{
        console.log('error',error);
        this.showSplash = false;
        this.navCtrl.setRoot(HomePage);    
        this.showAlert('Ocurrió un error',error);
      }
    )
    */

    this.getOffers();
  }

  getOffers() {
    let sendData = { "cities": this.citiesFiltered, "categories": this.categoriesFiltered, "latitude": this.latitude, "longitude": this.longitude, "limit": this.offersLimit, "limitstart": this.offersLimitStart };
    this.offerService.obtenerOfertas(sendData)
      .subscribe(
        (data) => {
          console.log('data', data);
          if(data){

         
          if (data.length < this.offersLimit) {
            this.offersShowAll = true;
          }
          this.offers = data;
          this.offers.forEach((element: any) => {
            element.showDiscount = "-" + element.priceDiscount + "%";
            element.dosporuno = false;
            if (element.price / 2 == element.specialPrice) {
              element.showDiscount = "2x1";
              element.dosporuno = true;
            }
            if (element.distance != null) {
              element.distance = Math.round(element.distance * 100) / 100;
            }
            this.items.push(element);
            //console.log('this.items', this.items);
          });
        }
          console.log('this.items', this.items);
          this.showSplash = false;
        },
        (error) => {
          console.log('error', error);
          this.showSplash = false;
          this.navCtrl.setRoot(HomePage);
          this.showAlert('Ocurrió un error', error);
        }
      )

  }

  doInfinite(): Promise<any> {
    console.log('Begin async operation');
    return new Promise((resolve) => {
      this.offersLimitStart += this.offersLimit;
      if (!this.offersShowAll) {
        this.getOffers();
      }
      setTimeout(() => {
        resolve();
      }, 1000);
    })
  }

  showAlert(title_: string, subTitle_: string) {
    const alert = this.alertController.create({
      title: title_,
      subTitle: subTitle_,
      buttons: ['OK']
    });
    alert.present();
  }

  increaseWhatsappClick(offer) {
    console.log('increaseWhatsappClick');
    this.offerService.increaseWhatsappClick(offer)
      .subscribe(
        data => {
          console.log('increaseWhatsappClick data: ', data);
        },
        error => {
          console.log('increaseWhatsappClick error: ', error);
        }
      );
  }

  search() {
    
    this.offersLimit = 10;
    this.offersLimitStart = 0;
    const modal = this.modalCtrl.create(CuponesSearchPage);
    modal.onDidDismiss(data => {
      //console.log(data);
      this.showSplash = true;
      this.items = [];
      this.getOffers();
    });
    modal.present();
    this.showSplash = true;
  }

  navToOfferPage(){

  }
}
